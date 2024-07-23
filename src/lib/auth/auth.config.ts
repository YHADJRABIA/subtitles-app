import { NextAuthOptions, Session } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import bycrptjs from 'bcryptjs'
import { connectDB } from '@/lib/mongodb'
import { UserModel } from '@/models/user.model'
import { UserAPIType } from '@/types/user'
import { isDevelopment } from '@/utils/general'
import { getUserByEmail } from '@/utils/db/user'
import { getErrorMessage, getZodErrors } from '@/utils/errors'
import { AccountLoginValidator } from '@/types/schemas/auth'
import { getTranslations } from 'next-intl/server'
import { getNextLocale } from '@/utils/cookies'

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, NEXTAUTH_SECRET } = process.env

interface PropTypes {
  user: UserAPIType
  session: Session
  account: { provider: string }
}

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
        email: {
          label: 'Email',
          type: 'email',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },

      // Runs on credential login (with email & password)
      async authorize(credentials) {
        const locale = getNextLocale()

        const [t_zod, t] = [
          await getTranslations({ locale, namespace: 'Zod' }),
          await getTranslations({
            locale,
            namespace: 'Auth.Login',
          }),
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

    // Called after authorize (or after JWT is created or updated), user is only populated on login
    jwt({ token, user }) {
      if (!user) return token // Logged out

      const isVerifiedEmail = !!user.emailVerified
      const { createdAt, lastLogin, updatedAt } = user

      return { ...token, isVerifiedEmail, createdAt, lastLogin, updatedAt } // Passing down token to session
    },

    // Called after jwt
    session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
          isVerifiedEmail: token.isVerifiedEmail,
          creationDate: token.createdAt,
          lastUpdateDate: token.updatedAt,
          lastLoginDate: token.lastLogin,
        },
      }
    },

    async signIn({ user, account }: PropTypes) {
      const locale = getNextLocale()

      const t = await getTranslations({
        locale,
        namespace: 'Auth.Login',
      })

      const [withGoogle, withCredentials] = [
        account.provider === 'google',
        account.provider === 'credentials',
      ]

      if (!user) return null

      const isVerifiedEmail = !!user.emailVerified

      // Credentials login
      if (withCredentials) {
        try {
          // Deny access if unverified email
          if (!isVerifiedEmail) throw new Error(t('unverified_email')) // TODO: Make status 400
          /*           return NextResponse.redirect(
            new URL(DEFAULT_LOGIN_REDIRECT_ROUTE, 'localhost:3000/')
          ) */
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

          const existingUser = await getUserByEmail(email)
          if (existingUser) return user

          const newUser = new UserModel({
            name,
            email,
            image,
            emailVerified: new Date(), // Verify email automatically
          })
          const res = await newUser.save()
          if (res.status === 200 || res.status === 201) {
            return user
          }
        } catch (err) {
          console.error('Google SignIn failed:', getErrorMessage(err))
          throw err
        }
      }

      // Todo: update lastLogin field on login

      return true
    },
  },
}
