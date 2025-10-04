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
		<div className="min-h-screen bg-gray-50 py-8"
					style={{
				backgroundImage: "url('/app/images/castle_wall_rpg.png')",
				backgroundSize: "cover",
			}}>
			<div className="max-w-4xl mx-auto px-6">
				<h1 className="text-3xl font-bold mb-8 text-center">
					Choose Your Character!
				</h1>

				<form onSubmit={handleSubmit} className="space-y-8">
					{/* Basic Info */}
					<section>
						<div className="grid grid-cols-3 gap-6">
							<div className="flex flex-col">
								<label className="text-sm font-medium mb-1">
									Name
								</label>
								<input
									type="text"
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
							</div>

							<div className="flex flex-col">
								<label className="text-sm font-medium mb-1">
									Pronouns
								</label>
								<input
									type="text"
									value={characterData.pronouns}
									onChange={(e) =>
										setCharacterData({
											...characterData,
											pronouns: e.currentTarget.value,
										})
									}
									className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
								/>
							</div>

							<div className="flex flex-col">
								<label className="text-sm font-medium mb-1">
									Age
								</label>
								<input
									type="text"
									value={characterData.age}
									onChange={(e) =>
										setCharacterData({
											...characterData,
											age: e.currentTarget.value,
										})
									}
									className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
								/>
							</div>
						</div>
					</section>

					{/* Attributes */}
					<section>
						<h2 className="text-xl font-semibold mb-4">
							Attributes
						</h2>
						<div className="grid grid-cols-3 gap-6">
							<div className="flex flex-col">
								<label className="text-sm font-medium mb-1">
									Race
								</label>
								<input
									type="text"
									value={characterData.race}
									onChange={(e) =>
										setCharacterData({
											...characterData,
											race: e.currentTarget.value,
										})
									}
									className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
								/>
							</div>

							<div className="flex flex-col">
								<label className="text-sm font-medium mb-1">
									Class
								</label>
								<input
									type="text"
									value={characterData.class}
									onChange={(e) =>
										setCharacterData({
											...characterData,
											class: e.currentTarget.value,
										})
									}
									className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
								/>
							</div>

							<div className="flex flex-col">
								<label className="text-sm font-medium mb-1">
									Armaments
								</label>
								<input
									type="text"
									value={characterData.armaments}
									onChange={(e) =>
										setCharacterData({
											...characterData,
											armaments: e.currentTarget.value,
										})
									}
									className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
								/>
							</div>
						</div>
						<div className="flex flex-col pt-4">
							<label className="text-sm font-medium mb-1">
								Abilities
							</label>
							<textarea
								rows={2}
								value={characterData.abilities}
								onChange={(e) =>
									setCharacterData({
										...characterData,
										abilities: e.currentTarget.value,
									})
								}
								className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
							/>
						</div>
					</section>

					{/* Description */}
					<section>
						<h2 className="text-xl font-semibold mb-4">
							Description
						</h2>
						<div className="flex flex-col space-y-4">
							<div className="flex flex-col">
								<label className="text-sm font-medium mb-1">
									Appearance
								</label>
								<textarea
									rows={2}
									value={characterData.appearance}
									onChange={(e) =>
										setCharacterData({
											...characterData,
											appearance: e.currentTarget.value,
										})
									}
									className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
								/>
							</div>

							<div className="flex flex-col">
								<label className="text-sm font-medium mb-1">
									Backstory
								</label>
								<textarea
									rows={3}
									value={characterData.backstory}
									onChange={(e) =>
										setCharacterData({
											...characterData,
											backstory: e.currentTarget.value,
										})
									}
									className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
								/>
							</div>
						</div>
						

						<div className="grid grid-cols-2 gap-6 pt-4">
							<div className="flex flex-col">
								<label className="text-sm font-medium mb-1">
									Personality
								</label>
								<textarea
									rows={2}
									value={characterData.personality}
									onChange={(e) =>
										setCharacterData({
											...characterData,
											personality: e.currentTarget.value,
										})
									}
									className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
								/>
							</div>

							<div className="flex flex-col">
								<label className="text-sm font-medium mb-1">
									Motivation
								</label>
								<textarea
									rows={2}
									value={characterData.motivation}
									onChange={(e) =>
										setCharacterData({
											...characterData,
											motivation: e.currentTarget.value,
										})
									}
									className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
								/>
							</div>
						</div>
					</section>

					<button
						type="submit"
						className="px-4 py-2 bg-green-900 text-white rounded-lg shadow hover:bg-green-950"
					>
						Awaken!
					</button>
				</form>
			</div>
		</div>
	);
}
