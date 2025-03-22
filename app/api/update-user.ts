import { prisma } from "@/db/prisma";
export default async function handler(req:any, res:any) {
  if (req.method !== "POST") return res.status(405).end();
  const { userId, name } = req.body;

  console.log(userId, name , "this is update user route")
  
  await prisma.user.update({ where: { id: userId }, data: { name } });
  
  res.status(200).json({ success: true });
}