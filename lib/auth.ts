import type { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

import type { Role } from "@/types/auth"

type DemoUser = {
  id: string
  email: string
  password: string
  name: string
  role: Role
}

const DEMO_USERS: DemoUser[] = [
  {
    id: "1",
    email: "admin@example.com",
    password: "admin123",
    name: "Admin User",
    role: "admin",
  },
  {
    id: "2",
    email: "user@example.com",
    password: "user123",
    name: "Demo User",
    role: "user",
  },
]

export const authOptions: AuthOptions = {
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const match = DEMO_USERS.find(
          (demoUser) =>
            demoUser.email === credentials?.email &&
            demoUser.password === credentials?.password
        )

        if (!match) {
          return null
        }

        return {
          id: match.id,
          email: match.email,
          name: match.name,
          role: match.role,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      session.user.role = token.role
      return session
    },
  },
}
