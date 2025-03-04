export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { message } = req.body;

  // Simulated bot response (Replace with AI API later)
  const botReply = `You said: "${message}"`;

  res.status(200).json({ reply: botReply });
}
