// app/routes/quest/chat.tsx
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
import { AlertTriangle } from "lucide-react";

export default function Chat({ loaderData }: Route.ComponentProps) {
	const navigation = useNavigation();
	const navigate = useNavigate();
	const location = useLocation();
	const containerRef = useRef<HTMLDivElement>(null);

	const { completeData } =
		(location.state as { completeData: CampaignData }) || {};
	const campaignData = completeData;

	useEffect(() => {
		if (!campaignData) navigate("/quest/character-builder");
	}, [campaignData, navigate]);

	if (!campaignData) return <Spinner size={100} />;

	const character = campaignData.characterData;
	const story = campaignData.storyData;

	const [input, setInput] = useState("");
	const [started, setStarted] = useState(false);
	const [inDanger, setInDanger] = useState(false);

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

	// Update danger status when tool results come in
	useEffect(() => {
		const lastMessage = messages[messages.length - 1];
		if (lastMessage?.role === "assistant") {
			for (const part of lastMessage.parts) {
				// Check if this is a tool call part with our specific tool
				if (part.type === "tool-call" && "toolName" in part) {
					if (
						part.toolName === "updateDangerStatus" &&
						"result" in part &&
						part.result
					) {
						const result = part.result as { inDanger: boolean };
						setInDanger(result.inDanger);
					}
				}
			}
		}
	}, [messages]);

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
		<div className="flex flex-col h-screen p-4 bg-gray-50"
    			style={{
				backgroundImage: "url('/app/images/castle_wall_rpg.png')",
				backgroundSize: "cover",
			}}>
			<h2 className="text-3xl font-bold mb-4 text-center">
				Step Forth, {character.name}. {story.title} Awaits!
			</h2>

			{/* Danger Indicator */}
			{inDanger && (
				<div className="mb-4 p-3 bg-red-100 border border-red-300 rounded-lg shadow-md flex gap-2 items-center">
					<AlertTriangle size={20} className="text-red-600" />
					<span className="text-red-700 font-semibold">
						You are in danger!
					</span>
				</div>
			)}

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
				className="flex-1 overflow-y-auto space-y-2 p-2 rounded-lg"
			>
				{messages.map((msg, index) => {
					if (index === 0 || index == 1) return null; // Skip system message

					const isUser = msg.role === "user";

					return (
						<Card
							key={msg.id}
							className={`w-fit max-w-[90%] py-1 px-2 ${
								isUser
									? "ml-auto bg-green-900/40"
									: "mr-auto bg-gray-900/40"
							}`}
						>
							<CardContent className="p-0.5">
								{msg.parts.map((part, i) =>
									part.type === "text" ? (
										<div
											key={i}
											className="whitespace-pre-wrap"
										>
											{part.text}
										</div>
									) : null
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
						if (input.trim()) {
							sendMessage({ text: input });
							setInput("");
						}
					}}
					className="mt-2 flex gap-2"
				>
					<Input
						placeholder="Type your action..."
						value={input}
						onChange={(e) => setInput(e.currentTarget.value)}
						className="flex-1"
						disabled={status === "streaming"}
					/>
					<Button type="submit" disabled={status === "streaming"}>
						{status === "streaming" ? "..." : "Act"}
					</Button>
				</form>
			)}
		</div>
	);
}
