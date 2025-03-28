export default function handler(req:any, res:any) {
  const sessionCartId = crypto.randomUUID();
  res.setHeader("Set-Cookie", `sessionCartId=${sessionCartId}; Path=/;`);
  res.status(200).json({ sessionCartId });
}