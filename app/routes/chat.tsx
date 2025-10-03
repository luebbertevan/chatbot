import { useNavigation, useLocation, useNavigate } from "react-router";
import type { Route } from "./+types/chat";
import Spinner from "ui/Spinner";
import { useChat } from "@ai-sdk/react";
import { useEffect, useState, useRef } from "react";
import { DefaultChatTransport, type UIMessage } from "ai";
import type { CampaignData } from "~/types/campaignData";
import { getSystemPrompt } from "~/prompts/prompt";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";

export default function Chat({ loaderData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);

  const { completeData } = (location.state as { completeData: CampaignData }) || {};
  const campaignData = completeData;

  useEffect(() => {
    if (!campaignData) navigate("/quest/character-builder");
  }, [campaignData, navigate]);

  if (!campaignData) return <Spinner size={100} />;

  const character = campaignData.characterData;
  const story = campaignData.storyData;

  const [input, setInput] = useState("");
  const [started, setStarted] = useState(false);

  const systemPrompt = getSystemPrompt(campaignData);

  const systemMessage: UIMessage = {
    id: "system-1",
    role: "system",
    parts: [{ type: "text", text: systemPrompt, state: "done" }],
  };

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/quest/ai" }),
    messages: [systemMessage],
  });

  // auto-scroll to latest message
  useEffect(() => {
    containerRef.current?.scrollTo({
      top: containerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  if (navigation.state === "loading" || navigation.state === "submitting") {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner size={100} />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen p-4 bg-gray-50">
      <h2 className="text-3xl font-bold mb-4 text-center">
        Step Forth, {character.name}. {story.title} Awaits!
      </h2>

      {!started && (
        <div className="text-center mb-4">
          <Button
            onClick={() => {
              sendMessage({ text: "Start the adventure" });
              setStarted(true);
            }}
          >
            Start the Adventure
          </Button>
        </div>
      )}

      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto space-y-2 p-2 border rounded-lg bg-white shadow-md"
      >
        {messages.map((msg, index) => {
          if (index === 0 || index === 1) return null;

          const isUser = msg.role === "user";

          return (
            <Card
              key={msg.id}
              className={`max-w-9/10 py-1 px-2 ${
                isUser ? "ml-auto bg-gray-200" : "mr-auto bg-blue-100"
              }`}
            >
              <CardContent className="p-0.5">
                {msg.parts.map(
                  (part, i) => part.type === "text" && <div key={i}>{part.text}</div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {started && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage({ text: input });
            setInput("");
          }}
          className="mt-2 flex gap-2"
        >
          <Input
            placeholder="Type your action..."
            value={input}
            onChange={(e) => setInput(e.currentTarget.value)}
            className="flex-1"
          />
          <Button type="submit">Act</Button>
        </form>
      )}
    </div>
  );
}
