import NextAuth from 'next-auth'
import { compareSync } from 'bcrypt'
import Credentials from 'next-auth/providers/credentials'

import UserModel from '@/models/UserModel'
import usersTable from '@/database/schema/usersSchema'

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
        let user: typeof usersTable.$inferInsert | null = null

        try {
          const [dbUser] = await UserModel.getUserByEmail(email as string)
          // console.log({ dbUser })
          if (!dbUser) throw Error

          user = dbUser
          const isPasswordCorrect = compareSync(
            password as string,
            user.password || ''
          )

          if (!isPasswordCorrect) throw Error

          return { ...user, password: null, role: user?.roleName }
        } catch (error) {
          console.log({ Credentials: error })
        }

        return user
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.roleName
      return token
    },
    async session({ session, token }) {
      if (session?.user) session.user.roleName = token.role
      return session
    },
  },
})
