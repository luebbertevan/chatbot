import { redirect, useNavigation, type LoaderFunctionArgs } from "react-router";
import type { Route } from "./+types/chat";
import Spinner from "ui/Spinner";
import { useChat } from "@ai-sdk/react";
import { useState } from "react";
import { DefaultChatTransport } from "ai";

export default function Chat({ loaderData }: Route.ComponentProps) {
	const navigation = useNavigation();

	if (navigation.state === "loading" || navigation.state === "submitting") {
		return (
			<div className="flex items-center justify-center h-screen">
				<Spinner size={100} />
			</div>
		);
	}

	const { messages, sendMessage, status } = useChat({
		transport: new DefaultChatTransport({
			api: "/ai",
		}),
	});
	const [input, setInput] = useState("");

	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
			<h1 className="text-3xl font-bold mb-4">Chatbot</h1>

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
