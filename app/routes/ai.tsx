// app/routes/quest/ai.tsx
import { createOpenAI } from "@ai-sdk/openai";
import { z } from "zod";
import type { Route } from "./+types/ai";
import { streamText, convertToModelMessages, type UIMessage, tool } from "ai";

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function action({ request }: Route.ActionArgs) {
  const { messages }: { messages: UIMessage[] } = await request.json();

  const result = streamText({
    model: openai("gpt-4.1-mini"),
    messages: convertToModelMessages(messages),
    tools: {
      updateDangerStatus: {
        description: "REQUIRED: Must be called after EVERY response to update whether the character is currently in danger or combat.",
        inputSchema: z.object({
          inDanger: z.boolean().describe("True if the character is in immediate danger, combat, or facing threats. False if safe, exploring peacefully, or in dialogue.")
        }),
        execute: async ({ inDanger }) => {
          console.log("Danger Status:", inDanger);
          return { inDanger };
        },
      },
    },
  });

  return result.toUIMessageStreamResponse();
}


            //   <CardContent className="p-0.5">
            //     {msg.parts.map((part, i) => {
            //       if (part.type.startsWith("tool-")) {
            //         return (
            //           <div key={i} className="text-red-600 font-bold">
            //             TOOL CALLED: {part.type} →{" "}
            //             {JSON.stringify(part.value)}
            //           </div>
            //         );
            //       }

            //       if (part.type === "text") {
            //         return <div key={i}>{part.text}</div>;
            //       }

            //       return null;
            //     })}
            //   </CardContent>