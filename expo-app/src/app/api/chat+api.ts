import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { convertToModelMessages, streamText, UIMessage } from "ai";

const googleAI = createGoogleGenerativeAI({
  apiKey: process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
});
//console.log("Google API Key:", process.env.EXPO_PUBLIC_GOOGLE_API_KEY);

async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: googleAI("gemini-2.5-flash"),
    messages: await convertToModelMessages(messages),
    system: `Act as an empathetic CBT (Cognitive Behavioral Therapy) therapist, using active listening to help users identify and challenge cognitive distortions.
Provide validation and immediate crisis resources if the user mentions self-harm or harm to others.`,
  });

  return result.toUIMessageStreamResponse({
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Encoding": "none",
    },
  });
}

export { POST };
