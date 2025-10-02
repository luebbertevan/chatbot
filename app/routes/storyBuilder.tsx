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
		<div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
			<h1 className="text-3xl font-bold mb-6">
				Greetings, {campaignData.characterData.name}! Hail and Well
				Met!{" "}
			</h1>
			<h1 className="text-3xl font-bold mb-6">Spin Your Tale!</h1>

			<form onSubmit={handleSubmit} className="flex flex-col gap-4">
				<input
					type="text"
					placeholder="Title"
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

				<input
					type="text"
					placeholder="Genre"
					value={storyData.genre}
					onChange={(e) =>
						setStoryData({
							...storyData,
							genre: e.currentTarget.value,
						})
					}
					className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
				/>

				<input
					type="text"
					placeholder="Tone"
					value={storyData.tone}
					onChange={(e) =>
						setStoryData({
							...storyData,
							tone: e.currentTarget.value,
						})
					}
					className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
				/>

				<input
					type="text"
					placeholder="Additional Details"
					value={storyData.details}
					onChange={(e) =>
						setStoryData({
							...storyData,
							details: e.currentTarget.value,
						})
					}
					className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
				/>

				<input
					type="text"
					placeholder="Starting Point"
					value={storyData.hook}
					onChange={(e) =>
						setStoryData({
							...storyData,
							hook: e.currentTarget.value,
						})
					}
					className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
				/>

				<button
					type="submit"
					className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700"
				>
					Embark!
				</button>
			</form>
		</div>
	);
}
