import type { NextApiRequest, NextApiResponse } from "next";

const lmsResponses: Record<string, string> = {
  "courses": "We offer a variety of courses! You can check them out on our Courses page.",
  "pricing": "Our LMS provides flexible pricing plans. Visit the Pricing page for details.",
  "payment": "We accept payments through Razorpay, supporting UPI, credit/debit cards, and net banking.",
  "auth": "We use Clerk for authentication, ensuring a secure login and signup process.",
  "chat": "This AI chatbot is here to help you with any queries related to our LMS platform.",
  "features": "Our LMS platform includes real-time chat, a leaderboard, and an online code editor.",
  "support": "You can reach out to our support team anytime for assistance with your account or courses.",
  "hi": "Hello! 😊 How can I assist you with the LMS platform today?",
  "hello": "Hey there! 👋 Need help with anything related to our LMS?",
  "hey": "Hi! 👋 What can I do for you today?",
  "how are you": "I'm just a chatbot, but I'm feeling great! 😃 How can I assist you today?",
  "how's it going": "Everything's running smoothly! 🚀 What can I help you with?",
  "where is your branch": "Our LMS platform is fully online! 🌍 You can access it anytime, anywhere.",
  "location": "We operate digitally and are accessible worldwide! 🌎 No physical branches, just seamless learning online.",
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ message: "Message is required" });
  }

  const lowerMessage = message.toLowerCase();

  // Check if message matches predefined responses
  for (const key in lmsResponses) {
    if (lowerMessage.includes(key)) {
      return res.status(200).json({ reply: lmsResponses[key] });
    }
  }

  try {
    // Send to Hugging Face AI if no predefined LMS response
    const response = await fetch("https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill", {
      method: "POST",
      headers: {
        Authorization: `Bearer YOUR_HUGGINGFACE_API_KEY`, // Replace with your API key
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: message }),
    });

    const data = await response.json();
    let reply = data?.generated_text || data?.[0]?.generated_text || "I'm here to assist you! Feel free to ask me anything about our LMS platform.";

    return res.status(200).json({ reply });
  } catch (error) {
    console.error("Hugging Face API Error:", error);
    return res.status(200).json({
      reply: "Hmm... I couldn't process that right now, but I'm here to help! Ask me anything about the LMS platform.",
    });
  }
}
