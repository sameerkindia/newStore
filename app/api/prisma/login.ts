import { prisma } from "@/db/prisma";
import { compareSync } from "bcrypt-ts-edge";

export default async function handler(req:any, res:any) {
  // if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { email, password } = req.body;

  console.log(req.body , "this is req body")

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !compareSync(password, user.password!)) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  res.status(200).json({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  });
}