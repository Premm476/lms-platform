import { User as PrismaUser, Role } from "@prisma/client";

export interface User extends Omit<PrismaUser, 'password' | 'name' | 'emailVerified'> {
  id: string;
  name: string | null;
  email: string;
  emailVerified: Date | boolean | null; // Now allowed since we omitted the original
  role: Role;
  agreedToTerms: boolean;
  avatar: string | null;
  bio: string | null;
  verificationToken: string | null;
  resetToken: string | null;
  resetTokenExpires: Date | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}