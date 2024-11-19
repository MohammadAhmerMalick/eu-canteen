import NextAuth from 'next-auth'
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
        try {
          let user: typeof usersTable.$inferInsert | null = null

          const res = await UserModel.getUserByEmail(email as string)
          user = res[0]

          return { ...user, password: null, role: user?.roleName }
        } catch (error) {
          console.log(error)
        }

        return {}
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
