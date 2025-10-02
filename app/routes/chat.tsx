import {
	redirect,
	useNavigation,
	type LoaderFunctionArgs,
	useLocation,
  useNavigate,
} from "react-router";
import type { Route } from "./+types/chat";
import Spinner from "ui/Spinner";
import { useChat } from "@ai-sdk/react";
import { useEffect, useState } from "react";
import { DefaultChatTransport } from "ai";
import type { CampaignData } from "~/types/campaignData";

export default function Chat({ loaderData }: Route.ComponentProps) {
	const navigation = useNavigation();
  const navigate = useNavigate();
	const location = useLocation();

	const {completeData } =
		(location.state as { completeData: CampaignData }) || {};

  const campaignData = completeData;

  useEffect(() => {
    if (!campaignData) {
      console.log("no campaign data")
      navigate("/quest/character-builder");
    }
  }, [campaignData, navigate]);

  if (!campaignData) return <Spinner size={100} />;
  
  const character = campaignData.characterData;
  const story = campaignData.storyData;

	const { messages, sendMessage, status } = useChat({
		transport: new DefaultChatTransport({
			api: "/protected/ai",
		}),
	});
	const [input, setInput] = useState("");

	if (navigation.state === "loading" || navigation.state === "submitting") {
		return (
			<div className="flex items-center justify-center h-screen">
				<Spinner size={100} />
			</div>
		);
	}

	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
			<h1 className="text-3xl font-bold mb-4">Chatbot</h1>
			<h2 className="text-3xl font-bold mb-4">Step Forth, {character.name}. {story.title} Awaits! </h2>

			{messages.map((msg) => (
				<div key={msg.id}>
					{msg.role === "user" ? "User: " : "AI: "}
					{msg.parts.map(
						(part, i) =>
							part.type === "text" && (
								<div key={i}>{part.text}</div>
							)
					)}
				</div>
			))}

			<form
				onSubmit={(e) => {
					e.preventDefault();
					sendMessage({ text: input });
					setInput("");
				}}
			>
				<input
					value={input}
					onChange={(e) => setInput(e.currentTarget.value)}
					placeholder="Say something..."
				/>
			</form>
		</div>
	);
}
