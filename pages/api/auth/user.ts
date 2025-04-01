import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "@/lib/prisma"; // Using the centralized Prisma client instance

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // 1. Verify the request method (keeping from old version)
    if (req.method !== "GET") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    // 2. Get the user session (simplified from new version)
    const session = await getServerSession(req, res, authOptions);
    
    if (!session?.user?.email) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // 3. Fetch user from database (using select from both versions)
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { 
        id: true,
        role: true,
        name: true,
        email: true,
        // Add any additional fields needed from old version
      }
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // 4. Return the user data (simplified response from new version)
    return res.status(200).json(user);

  } catch (error) {
    // Enhanced error handling from old version
    console.error("Error in /api/auth/user:", error);
    return res.status(500).json({ 
      error: "Internal server error",
      details: error instanceof Error ? error.message : "Unknown error"
    });
  }
}