import { prisma } from "@/db/prisma";
// import bcrypt from "bcrypt";
import { compareSync } from "bcrypt-ts-edge";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !user.password || !compareSync(password, user.password)) {
    return new Response(JSON.stringify({ error: "Invalid credentials" }), {
      status: 401,
    });
  }

  // console.log(compareSync(password, user.password) , "this is bcypt")

  return new Response(
    JSON.stringify({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    }),
    { status: 200 }
  );
}
