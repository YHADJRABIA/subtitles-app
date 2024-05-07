import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import bycrptjs from 'bcryptjs'
import { connectDB } from '@/lib/mongodb'
import { UserModel } from '@/models/user.model'
import { UserAPIType } from '@/types/user'
import { isDevelopment } from '@/utils/general'
import { getUserByEmail } from '@/utils/mongoose'
import { isValidEmail, isValidPassword } from '@/utils/validators'
import { getErrorMessage } from '@/utils/errors'

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, NEXTAUTH_SECRET } = process.env

interface PropTypes {
  user: UserAPIType
  account: { provider: string }
}

interface Credentials {
  email: string
  password: string
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login', // Replaces built-in /api/auth/signIn form page with our custom page
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
        // For built-in form, useless here
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
        try {
          const { email, password } = credentials as Credentials

          if (!isValidEmail(email) || !isValidPassword(password)) {
            throw new Error('Missing fields')
          }
          await connectDB()
          const existingUser = await getUserByEmail(email)

          // If no matching user or user registered via Google (no password)
          if (!existingUser || !existingUser?.password) {
            throw new Error("User doesn't exist")
          }

          const passwordsMatch = await bycrptjs.compare(
            password,
            existingUser.password
          )
          if (!passwordsMatch) throw new Error('Incorrect password')

          // Passing down user to JWT
          return existingUser // TODO: Limit what's passed down
        } catch (err) {
          console.error('Authorization failed:', getErrorMessage(err))
          throw err // Propagate error to frontend
        }
      },
    }),
  ],

  callbacks: {
    // Called after authorize
    jwt({ token, user }) {
      if (user) {
        token.user = user
      }
      // Passing down token to session
      return token
    },

    // Called after jwt
    session({ session, token }) {
      return { ...session, user: { ...session.user, id: token.sub } }
    },

    async signIn({ user, account, profile }: PropTypes) {
      if (!user) return null
      if (account.provider === 'google') {
        try {
          const { name, email, image } = user
          await connectDB()

          const existingUser = await getUserByEmail(email)
          if (existingUser) return user

          const newUser = new UserModel({
            name,
            email,
            image,
            isVerified: true,
          })
          const res = await newUser.save()
          if (res.status === 200 || res.status === 201) {
            return user
          }
        } catch (err) {
          console.error('Google SignIn failed:', getErrorMessage(err))
        }
      }
      return user
    },
  },
}
