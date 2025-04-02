import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "@/lib/prisma";
import { User } from "@/types/user";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User | { error: string; details?: string }>
) {
  try {
    if (req.method !== "GET") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const session = await getServerSession(req, res, authOptions);
    
    if (!session?.user?.email) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { 
        id: true,
        role: true,
        name: true,
        email: true,
        emailVerified: true,
        agreedToTerms: true,
        avatar: true,
        bio: true,
        verificationToken: true,
        resetToken: true,
        resetTokenExpires: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true
      }
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Convert emailVerified to boolean if it's a Date
    const userResponse = {
      ...user,
      emailVerified: user.emailVerified !== null ? true : false
    };

    return res.status(200).json(userResponse);

  } catch (error) {
    console.error("Error in /api/auth/user:", error);
    return res.status(500).json({ 
      error: "Internal server error",
      details: error instanceof Error ? error.message : "Unknown error"
    });
  }
}