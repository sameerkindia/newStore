export default async function handler(req:any, res:any) {
  if (req.method === 'POST') {
    // Process a POST request
  } else {
   return res.status(200).json({ success: true , message : "Get api is called" });
  }

  return res.status(200).json({ success: true , message : "api is called" });
}