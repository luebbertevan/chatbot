import { useNavigation, useLocation, useNavigate } from "react-router";
import type { Route } from "./+types/chat";
import Spinner from "ui/Spinner";
import { useChat } from "@ai-sdk/react";
import { useEffect, useState } from "react";
import { DefaultChatTransport, type UIMessage } from "ai";
import type { CampaignData } from "~/types/campaignData";
import { getSystemPrompt } from "~/prompts/prompt";


export default function Chat({ loaderData }: Route.ComponentProps) {
	const navigation = useNavigation();
	const navigate = useNavigate();
	const location = useLocation();

	const { completeData } =
		(location.state as { completeData: CampaignData }) || {};

	const campaignData = completeData;

	useEffect(() => {
		if (!campaignData) {
			console.log("no campaign data");
			navigate("/quest/character-builder");
		}
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
		transport: new DefaultChatTransport({
			api: "/quest/ai",
		}),
		messages: [systemMessage],
	});

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
			<h2 className="text-3xl font-bold mb-4">
				Step Forth, {character.name}. {story.title} Awaits!{" "}
			</h2>

			{!started && (
				<button
					onClick={() => {
						sendMessage({ text: "Start the adventure" });
						setStarted(true);
					}}
				>
					Start the Adventure
				</button>
			)}

			{messages.map((msg, index) => {
				if (index === 0 || msg.role === "system") return null;

				return (
					<div key={msg.id} className="mb-2">
						{msg.parts.map(
							(part, i) =>
								part.type === "text" && (
									<div key={i}>{part.text}</div>
								)
						)}
					</div>
				);
			})}

			{started && (
				<form
					onSubmit={(e) => {
						e.preventDefault();
						sendMessage({ text: input });
						setInput("");
					}}
					className="mt-4 flex gap-2"
				>
					<input
						value={input}
						onChange={(e) => setInput(e.currentTarget.value)}
						placeholder="Say something..."
						className="border p-2 flex-1"
					/>
					<button
						type="submit"
						className="px-4 py-2 bg-green-600 text-white rounded-lg"
					>
						Send
					</button>
				</form>
			)}
		</div>
	);
}
