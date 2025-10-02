import { useNavigate, useNavigation } from "react-router";
import { useState } from "react";
import Spinner from "ui/Spinner";
import { createDefaultCampaign, type CampaignData } from "~/types/campaignData";

export default function characterBuilder() {
	const navigation = useNavigation();
	const navigate = useNavigate();
	const defaultCampaign = createDefaultCampaign();
	const [characterData, setCharacterData] = useState<
		CampaignData["characterData"]
	>(defaultCampaign.characterData);

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
			...defaultCampaign,
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
					placeholder="Name"
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

				<input
					type="text"
					placeholder="Pronouns"
					value={characterData.pronouns}
					onChange={(e) =>
						setCharacterData({
							...characterData,
							pronouns: e.currentTarget.value,
						})
					}
					className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
				/>

				<input
					type="text"
					placeholder="Age"
					value={characterData.age}
					onChange={(e) =>
						setCharacterData({
							...characterData,
							age: e.currentTarget.value,
						})
					}
					className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
				/>

				<input
					type="text"
					placeholder="Race"
					value={characterData.race}
					onChange={(e) =>
						setCharacterData({
							...characterData,
							race: e.currentTarget.value,
						})
					}
					className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
				/>

				<input
					type="text"
					placeholder="Class"
					value={characterData.class}
					onChange={(e) =>
						setCharacterData({
							...characterData,
							class: e.currentTarget.value,
						})
					}
					className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
				/>

				<input
					type="text"
					placeholder="Armaments"
					value={characterData.armaments}
					onChange={(e) =>
						setCharacterData({
							...characterData,
							armaments: e.currentTarget.value,
						})
					}
					className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
				/>

				<input
					type="text"
					placeholder="Apperance"
					value={characterData.appearance}
					onChange={(e) =>
						setCharacterData({
							...characterData,
							appearance: e.currentTarget.value,
						})
					}
					className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
				/>

				<input
					type="text"
					placeholder="Backstory"
					value={characterData.backstory}
					onChange={(e) =>
						setCharacterData({
							...characterData,
							backstory: e.currentTarget.value,
						})
					}
					className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
				/>

				<input
					type="text"
					placeholder="Personality"
					value={characterData.personality}
					onChange={(e) =>
						setCharacterData({
							...characterData,
							personality: e.currentTarget.value,
						})
					}
					className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
				/>

				<input
					type="text"
					placeholder="Motivation"
					value={characterData.motivation}
					onChange={(e) =>
						setCharacterData({
							...characterData,
							motivation: e.currentTarget.value,
						})
					}
					className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
