export async function GET() {
    const sessionCartId = crypto.randomUUID();
    return new Response(JSON.stringify({ sessionCartId }), {
      status: 200,
      headers: {
        "Set-Cookie": `sessionCartId=${sessionCartId}; Path=/; HttpOnly; SameSite=Lax`,
      },
    });
  }
  