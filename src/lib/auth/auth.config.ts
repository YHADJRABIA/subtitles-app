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
  updateUserById,
  verifyEmailByUserId,
} from '@/utils/db/user'
import { getErrorMessage, getZodErrors } from '@/utils/errors'
import { AccountLoginValidator } from '@/types/schemas/auth'
import { getTranslations } from 'next-intl/server'
import { getNextLocale } from '@/utils/cookies'
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
        const locale = getNextLocale()

        const [t_zod, t] = [
          await getTranslations({ locale, namespace: 'Zod' }),
          await getTranslations({
            locale,
            namespace: 'Auth.Login',
          }),
        ]

        /*         if (req.status === 429) {
          throw new Error(t('too_many_api_calls')) // TODO: implement this
        } */

        try {
          const validatedFields = AccountLoginValidator(t_zod as any).safeParse(
            credentials
          )

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

          // Passing down user to JWT
          return existingUser // TODO: Limit what's passed down
        } catch (err) {
          console.error('Authorization failed:', getErrorMessage(err))
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
    jwt({ token, user, session, trigger }) {
      // TODO: Check if access token is expired and prompt login if so

      if (!token.sub) return token // Logged out

      // Update token according to client session's data
      // Triggered if `update` of useSession is called
      if (trigger === 'update') {
        // Update session only if name is different (i.e. session.xxx isn't undefined)
        if (session?.name) token.name = session.name
        if (session?.email) token.email = session.email

        return { ...token, ...session } // TODO: redundant to spread session?
      }

      // User only defined after authorize (login)
      if (!user) return token // Logged out
      const isVerifiedEmail = !!user.emailVerified
      const { createdAt, lastLogin, updatedAt } = user // TODO: Prevent updatedAt from updating at login, should only update if user info hasn't changed

      return { ...token, isVerifiedEmail, createdAt, lastLogin, updatedAt } // Passing down token to session
    },

    // Called after jwt
    session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
          name: token.name, // Updated name passed down from jwt after update-trigger
          isVerifiedEmail: token.isVerifiedEmail,
          creationDate: token.createdAt,
          lastUpdateDate: token.updatedAt,
          lastLoginDate: token.lastLogin,
        },
      }
    },

    async signIn({ user, account }) {
      const locale = getNextLocale()

      const t = await getTranslations({
        locale,
        namespace: 'Auth.Login',
      })

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

          /*           if (user?.error.status === 429) {
            throw new Error(t('too_many_api_calls'))
          } */
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

          const existingUser = (await getUserByEmail(email ?? '')) as any // TODO: Fix api interface

          if (existingUser) {
            // Verify user's existing account if user logs in with Google
            if (!existingUser.emailVerified) {
              await Promise.all([
                verifyEmailByUserId(existingUser._id),
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
              existingUser._id,
              updatedFields
            )

            // Data to be accessed via getUserSession
            Object.assign(user, {
              id: existingUser._id,
              lastLogin: existingUser.lastLogin, // Previous login
              createdAt: updatedUser.createdAt,
              updatedAt: updatedUser.updatedAt, // TODO: Prevent updatedAt from updating at login, should only update if user info hasn't changed
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
            id: newUser._id,
            createdAt: newUser.createdAt,
            updatedAt: newUser.updatedAt,
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
