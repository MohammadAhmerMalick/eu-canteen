import NextAuth from 'next-auth'
import { compareSync } from 'bcrypt'
import Credentials from 'next-auth/providers/credentials'

import UserModel from '@/models/UserModel'
import type {} from '@/database/schema/usersSchema'
import TransactionModel from '@/models/TransactionModel'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'email:',
          type: 'text',
        },
        password: {
          label: 'password:',
          type: 'password',
        },
      },
      authorize: async ({ email, password }) => {
        try {
          const [dbUser] = await UserModel.getUserByEmail(email as string)
          if (!dbUser) return { error: `No user with ${email} email found` }

          const user = dbUser
          const isPasswordCorrect = compareSync(
            password as string,
            user.password || ''
          )

          if (!isPasswordCorrect) return { error: 'Invalid credentials.' }
          if (!user.approved)
            return {
              error: 'Your request in not approved yet, please contact admin',
            }

          const amount = await TransactionModel.getUserTodaysTransactions(
            user.id
          )

          const credit = amount
            .reduce((a, b) => Number(a) + Number(b.amount), 0)
            .toString()

          await UserModel.updateUserCredit(user.id, credit)

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.roleName,
            image: user.image,
          }
        } catch (error) {
          console.log({ authorize: error })
          // throw error
          return {
            error: 'Unable to handle request',
          }
        }
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  // debug: process.env.NODE_ENV === 'development',
  callbacks: {
    async jwt({ token, user }) {
      if (token.error) return token
      if (user) return { ...token, ...user }
      return token
    },
    async session({ session, token }) {
      if (token.error) return { error: token.error, ...session }
      if (session?.user)
        return {
          ...session,
          user: {
            id: token.id,
            name: token.name,
            email: token.email,
            image: token.image,
            role: token.role,
          },
        }
      return session
    },
  },
})
