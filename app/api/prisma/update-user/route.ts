import { prisma } from "@/db/prisma";

export async function POST(req: Request) {
  const { userId, name } = await req.json();

  await prisma.user.update({
    where: { id: userId },
    data: { name },
  });

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
