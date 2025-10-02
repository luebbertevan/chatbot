import { useLocation, useNavigate, useNavigation } from "react-router";
import Spinner from "ui/Spinner";
import type { CampaignData } from "~/types/campaignData";

export default function storyBuilder() {
	const navigation = useNavigation();
	const navigate = useNavigate();
	const location = useLocation();

	if (navigation.state === "loading" || navigation.state === "submitting") {
		return (
			<div className="flex items-center justify-center h-screen">
				<Spinner size={100} />
			</div>
		);
	}

	const { campaignData } =
		(location.state as { campaignData: CampaignData }) || {};

	if (!campaignData) {
		navigate("/quest/character-creator");
		return null;
	}

	 const { characterData, storyData } = campaignData;
	 console.log(characterData);

	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
			<h1 className="text-3xl font-bold mb-6">Greetings, {characterData.name}! Hail and Well Met! </h1>
			<h1 className="text-3xl font-bold mb-6">Spin Your Tale!</h1>
			<button
				className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700"
				onClick={() => navigate("/quest/adventure")}
			>
				Embark!
			</button>
		</div>
	);
}
