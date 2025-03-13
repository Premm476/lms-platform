import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    const courses = await prisma.course.findMany();
    res.status(200).json(courses);
  }
}
