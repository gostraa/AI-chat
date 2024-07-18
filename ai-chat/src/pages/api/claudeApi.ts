import type { NextApiRequest, NextApiResponse } from "next";
import { Anthropic } from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.NEXT_PUBLIC_CLAUDE_API_KEY,
});

let messages: any[] = [];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const userInput = req.body.message;

    if (userInput.toLowerCase() === "quit") {
      return res.status(200).json({ message: "Conversation ended" });
    }

    messages.push({
      role: "user",
      content: [{ type: "text", text: userInput }],
    });

    try {
      const messageResponse: any = await anthropic.messages.create({
        model: "claude-3-5-sonnet-20240620",
        max_tokens: 1024,
        messages: messages,
      });

      if (messageResponse && messageResponse.content) {
        const assistantReply = messageResponse.content[0].text;
        console.log("Assistant:", assistantReply);

        messages.push({
          role: "assistant",
          content: [{ type: "text", text: assistantReply }],
        });

        res.status(200).json({ message: assistantReply });
      } else {
        console.log("No response from assistant.");
        res.status(500).json({ error: "No response from assistant" });
      }
    } catch (error: any) {
      console.error("Error fetching response from Anthropic:", error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
