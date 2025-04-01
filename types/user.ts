// types/user.ts
import { User as PrismaUser, Course as PrismaCourse, Role } from "@prisma/client";

export interface User extends Omit<PrismaUser, 'password'> {
  id: string;
  name: string | null;
  email: string;
  role: Role;
  password?: string; // Make password optional
}

export interface Course extends PrismaCourse {
  instructor?: User;
  enrollments?: { user: User }[];
}

export interface SessionUser extends Partial<User> {
  image?: string | null;
}