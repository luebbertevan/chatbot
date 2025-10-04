import { useEffect, useState } from "react";
import { useLocation, useNavigate, useNavigation } from "react-router";
import Spinner from "ui/Spinner";
import type { CampaignData } from "~/types/campaignData";

export default function storyBuilder() {
	const navigation = useNavigation();
	const navigate = useNavigate();
	const location = useLocation();

	const { campaignData } =
		(location.state as { campaignData: CampaignData }) || {};

	useEffect(() => {
		if (!campaignData) {
			console.log("no campaign data");
			navigate("/quest/character-builder");
		}
	}, [campaignData, navigate]);

	if (!campaignData) return <Spinner size={100} />;

	const [storyData, setStoryData] = useState<CampaignData["storyData"]>(
		campaignData.storyData
	);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const completeData = {
			...campaignData,
			storyData,
		};

		navigate("/quest/adventure", { state: { completeData } });
	};
	if (navigation.state === "loading" || navigation.state === "submitting") {
		return (
			<div className="flex items-center justify-center h-screen">
				<Spinner size={100} />
			</div>
		);
	}
	return (
		<div className="min-h-screen bg-gray-50 py-8"
					style={{
				backgroundImage: "url('/app/images/castle_wall_rpg.png')",
				backgroundSize: "cover",
			}}>
			<div className="max-w-4xl mx-auto px-6">
				<h1 className="text-3xl font-bold mb-4 text-center" >
					Greetings, {campaignData.characterData.name}! Hail and Well
					Met!
				</h1>
				<h1 className="text-3xl font-bold mb-8 text-center">Spin Your Tale!</h1>

				<form onSubmit={handleSubmit} className="space-t-8">
					{/* Story Basics */}
					<section>
						<h2 className="text-xl font-semibold mb-4">
							Story Details
						</h2>
						<div className="grid grid-cols-3 gap-6">
							<div className="flex flex-col">
								<label className="text-sm font-medium mb-1">
									Title
								</label>
								<input
									type="text"
									value={storyData.title}
									onChange={(e) =>
										setStoryData({
											...storyData,
											title: e.currentTarget.value,
										})
									}
									className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
									required
								/>
							</div>

							<div className="flex flex-col">
								<label className="text-sm font-medium mb-1">
									Genre
								</label>
								<input
									type="text"
									value={storyData.genre}
									onChange={(e) =>
										setStoryData({
											...storyData,
											genre: e.currentTarget.value,
										})
									}
									className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
								/>
							</div>
							<div className="flex flex-col">
								<label className="text-sm font-medium mb-1">
									Tone
								</label>
								<input
									type="text"
									value={storyData.tone}
									onChange={(e) =>
										setStoryData({
											...storyData,
											tone: e.currentTarget.value,
										})
									}
									className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
								/>
							</div>
						</div>

							<div className="flex flex-col pt-4">
								<label className="text-sm font-medium mb-1">
									Narrative Details
								</label>
								<textarea
									rows={3}
									value={storyData.details}
									onChange={(e) =>
										setStoryData({
											...storyData,
											details: e.currentTarget.value,
										})
									}
									className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
								/>

						</div>
					</section>

					{/* Hook */}
					<section>
						<h2 className="text-xl font-semibold my-4">Hook</h2>
						<div className="flex flex-col">
							<label className="text-sm font-medium mb-1">
								Starting Point
							</label>
							<textarea
								rows={4}
								value={storyData.hook}
								onChange={(e) =>
									setStoryData({
										...storyData,
										hook: e.currentTarget.value,
									})
								}
								className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
							/>
						</div>
					</section>

					<button
						type="submit"
						className="px-6 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 my-6"
					>
						Embark!
					</button>
				</form>
			</div>
		</div>
	);
}
