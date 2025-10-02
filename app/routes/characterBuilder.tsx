import { useNavigate, useNavigation } from "react-router";
import { useState } from "react";
import Spinner from "ui/Spinner";
import { createDefaultCampaign, type CampaignData } from "~/types/campaignData";

export default function characterBuilder() {
	const navigation = useNavigation();
	const navigate = useNavigate();

	const [characterData, setCharacterData] = useState<
		CampaignData["characterData"]
	>({
		name: "",
	});

	if (navigation.state === "loading" || navigation.state === "submitting") {
		return (
			<div className="flex items-center justify-center h-screen">
				<Spinner size={100} />
			</div>
		);
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const campaignData = {
			...createDefaultCampaign(),
			characterData,
		};

		navigate("/quest/story-builder", { state: { campaignData } });
	};

	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
			<h1 className="text-3xl font-bold mb-6">Choose Your Character!</h1>
			<form onSubmit={handleSubmit} className="flex flex-col gap-4">
				<input
					type="text"
					placeholder="Character Name"
					value={characterData.name}
					onChange={(e) =>
						setCharacterData({
							...characterData,
							name: e.currentTarget.value,
						})
					}
					className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
					required
				/>
				<button
					type="submit"
					className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700"
				>
					Awaken!
				</button>
			</form>
		</div>
	);
}
