import type { DefaultSession } from "next-auth"

import type { Role } from "@/types/auth"

declare module "next-auth" {
  interface Session {
    user: {
      role: Role
    } & DefaultSession["user"]
  }

  interface User {
    role: Role
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: Role
  }
}
