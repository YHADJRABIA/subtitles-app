import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import bycrptjs from 'bcryptjs'
import { connectDB } from '@/lib/mongodb'
import { UserModel } from '@/models/user.model'
import { UserAPIType } from '@/types/user'
import { isDevelopment } from '@/utils/general'
import {
  getUserByEmail,
  getUserById,
  updateUserById,
  verifyEmailByUserId,
} from '@/utils/db/user'
import { getErrorMessage, getZodErrors } from '@/utils/errors'
import { AccountLoginValidator } from '@/types/schemas/auth'
import { getTranslations } from 'next-intl/server'
import { getNextLocale } from '@/utils/cookies'
import { sendTwoFactorOTP } from './twoFactorAuth'
import { deleteVerificationTokenByEmail } from '@/utils/db/verification-token'

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, NEXTAUTH_SECRET } = process.env

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  // Replaces built-in /api/auth/xxx pages with our custom pages
  pages: {
    signIn: '/login',
    /*     error:'/autherror' */ // TODO: complete later
  },
  secret: NEXTAUTH_SECRET!,
  debug: isDevelopment,

  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID!,
      clientSecret: GOOGLE_CLIENT_SECRET!,
    }),

    // Replaces api/login route
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        // For built-in NextAuth form. Useless here since own UI exists
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },

      // Runs on credential login (with email & password)
      async authorize(credentials /* req */) {
        const locale = await getNextLocale()

        const [t_zod, t] = [
          await getTranslations({ locale, namespace: 'Zod' }),
          await getTranslations({ locale, namespace: 'Auth.Login' }),
        ]

        try {
          const validatedFields =
            AccountLoginValidator(t_zod).safeParse(credentials)

          // Form validation
          if (!validatedFields.success) {
            const zodErrors = getZodErrors(validatedFields.error)
            throw new Error(zodErrors.message)
          }

          const { email, password } = validatedFields.data
          await connectDB()
          const existingUser = await getUserByEmail(email)

          // If no matching user or user registered via Google (no password)
          if (!existingUser || !existingUser?.password) {
            throw new Error(t('incorrect_email_or_password'))
          }

          const passwordsMatch = await bycrptjs.compare(
            password,
            existingUser.password
          )
          if (!passwordsMatch) {
            throw new Error(t('incorrect_email_or_password'))
          }

          // If 2FA enabled — send OTP and block login
          if (existingUser.isTwoFactorEnabled) {
            try {
              await sendTwoFactorOTP(existingUser.id, email, locale)
              return null
            } catch (err) {
              // If unable to send OTP, throw error
              console.error('Failed to send 2FA OTP: ', getErrorMessage(err))
              throw new Error(t('failed_to_send_2fa_otp'))
            }
          }

          // Passing down user to JWT
          return existingUser
        } catch (err) {
          if (isDevelopment) {
            console.error('Authorization failed: ', getErrorMessage(err))
          }
          throw err // Propagate error to frontend
        }
      },
    }),
  ],

  events: {
    linkAccount({ user }) {
      console.log('Account linked to user', user) // TODO: Complete later with new account model
    },
  },

  callbacks: {
    redirect({ url, baseUrl }) {
      // Allows relative callback URLs (no need to add website prefix every time).
      // Example: {callbackUrl: '/login'} ---> www.[baseUrl].com/login
      if (url.startsWith('/')) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin, prevents redirections to external websites.
      // Example: {callbackUrl: 'www.[baseUrl].com/login'} is the same as {callbackUrl: '/login'}
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },

    // Called after JWT is created (on login) or updated (client session is accessed)
    async jwt({ token, user, session, trigger }) {
      // TODO: Check if access token is expired and prompt login if so

      const userId = token.sub!

      // Logout user (if account deleted from another browser and user)
      try {
        await connectDB()
        const existingUser = await getUserById(userId)
        if (!existingUser) {
          console.error('User not found in database, logging out')
          return { ...token, error: 'user-not-found' }
        }
      } catch (err) {
        console.error('Error gettingUserById in JWT:', getErrorMessage(err))
      }

      // Update token according to client's session data
      // Triggered if `update` of useSession is called
      if (trigger === 'update' && session) {
        // Update session only if data is different (i.e. session.xxx isn't undefined)

        const updatedToken = {
          ...token,
          ...session,
          lastUpdate: session.lastUpdateDate || token.lastUpdate,
        }

        return updatedToken
      }

      // User only defined after authorize (login)
      if (!user || !userId) return token // Logged out

      const {
        emailVerified,
        createdAt,
        lastLogin,
        lastUpdate,
        isTwoFactorEnabled,
        password,
      } = user

      // Update lastLogin on login
      if (trigger === 'signIn') token.lastLogin = new Date()

      return {
        ...token,
        isVerifiedEmail: !!emailVerified,
        createdAt,
        lastLogin,
        lastUpdate,
        isTwoFactorEnabled,
        hasCredentialsProvider: !!password,
      } // Passing down token to session
    },

    // Called after jwt
    // This data is exposed to client after signIn
    session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
          name: token.name, // Updated name passed down from jwt after update-trigger
          creationDate: token.createdAt,
          lastUpdateDate: token.lastUpdate,
          lastLoginDate: token.lastLogin,
          isTwoFactorEnabled: token.isTwoFactorEnabled,
          hasCredentialsProvider: token.hasCredentialsProvider,
          error: token.error,
        },
      }
    },

    async signIn({ user, account }) {
      const locale = await getNextLocale()

      const t = await getTranslations({ locale, namespace: 'Auth.Login' })

      const [withGoogle, withCredentials] = [
        account?.provider === 'google',
        account?.provider === 'credentials',
      ]

      if (!user) return null

      const isVerifiedEmail = !!user.emailVerified

      // Credentials login
      if (withCredentials) {
        try {
          // Deny access if unverified email
          if (!isVerifiedEmail) {
            throw new Error(t('unverified_email'))
          } else {
            // Update database's lastLogin with current time
            await updateUserById(user.id, { lastLogin: new Date() })
          }
        } catch (err) {
          console.error('Credentials SignIn failed:', getErrorMessage(err))
          throw err
        }
      }

      // Google login
      if (withGoogle) {
        try {
          const { name, email, image } = user
          await connectDB()

          const existingUser = !!email && (await getUserByEmail(email))

          if (existingUser) {
            // Verify user's existing account if user logs in with Google
            if (!existingUser.emailVerified) {
              await Promise.all([
                verifyEmailByUserId(existingUser.id),
                deleteVerificationTokenByEmail(existingUser.email),
              ])
            }

            // Update lastLogin & empty name & image
            const updatedFields: Partial<UserAPIType> = {
              lastLogin: new Date(),
              ...(existingUser?.name?.length ? {} : { name }),
              ...(existingUser?.image?.length ? {} : { image }),
            }

            const updatedUser = await updateUserById(
              existingUser.id,
              updatedFields
            )

            // Data to be accessed via getUserSession
            Object.assign(user, {
              id: existingUser.id,
              name: existingUser.name,
              image: existingUser.image,
              lastLogin: existingUser.lastLogin, // Previous login
              createdAt: updatedUser.createdAt,
              lastUpdate: updatedUser.lastUpdate,
              isTwoFactorEnabled: updatedUser.isTwoFactorEnabled,
              hasCredentialsProvider: !!existingUser.password,
            })

            return user
          }

          const newUser = new UserModel({
            favoriteLocale: locale,
            name,
            email,
            image,
            emailVerified: new Date(), // Verify email automatically
            createdAt: new Date(),
            lastLogin: new Date(),
          })
          const res = await newUser.save()

          // Data to be accessed via getUserSession
          Object.assign(user, {
            id: newUser.id,
            createdAt: newUser.createdAt,
            lastUpdate: newUser.lastUpdate,
            isTwoFactorEnabled: newUser.isTwoFactorEnabled,
            hasCredentialsProvider: false, // New Google users don't have credentials provider
            isVerifiedEmail: true,
          })

          if (res.status === 200 || res.status === 201) {
            return newUser
          }
        } catch (err) {
          console.error('Google SignIn failed:', getErrorMessage(err))
          throw err
        }
      }

      return true
    },
  },
}
