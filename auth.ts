import NextAuth from 'next-auth'
import { compareSync } from 'bcrypt'
import Credentials from 'next-auth/providers/credentials'

import UserModel from '@/models/UserModel'
import type { User } from '@/database/schema/usersSchema'

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
        let user: User | null = null

        try {
          const [dbUser] = await UserModel.getUserByEmail(email as string)
          if (!dbUser) throw new Error('User not found.')

          user = dbUser
          const isPasswordCorrect = compareSync(
            password as string,
            user.password || ''
          )

          if (!isPasswordCorrect) throw new Error('Invalid credentials.')

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.roleName,
            image: user.image,
          }
        } catch (error) {
          console.log({ authorize: error })
          throw error
        }
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  // debug: process.env.NODE_ENV === 'development',
  callbacks: {
    async jwt({ token, user }) {
      if (user) token = { ...token, ...user }
      return token
    },
    async session({ session, token }) {
      if (session?.user)
        session.user = {
          id: token.id,
          name: token.name,
          email: token.email,
          image: token.image,
          role: token.role,
        }
      return session
    },
  },
})
