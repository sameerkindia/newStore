import { prisma } from "@/db/prisma";

export default async function handler(req:any, res:any) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { userId, name } = req.body;
  await prisma.user.update({ where: { id: userId }, data: { name } });

  res.status(200).json({ success: true });
}