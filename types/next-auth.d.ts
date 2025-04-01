import "next-auth";
import { UserRole } from "@prisma/client"; // Import your Prisma UserRole enum

declare module "next-auth" {
  /**
   * Extended User type that includes additional fields from your database
   */
  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    emailVerified?: Date | null;
    role: UserRole;
    image?: string | null;
  }

  /**
   * Extended Session type that includes additional user fields
   */
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      emailVerified?: Date | null;
      role: UserRole;
      image?: string | null;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  /**
   * Extended JWT type that includes additional fields
   */
  interface JWT {
    id: string;
    name?: string | null;
    email?: string | null;
    emailVerified?: Date | null;
    role: UserRole;
    image?: string | null;
  }
}