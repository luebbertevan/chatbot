import { useNavigate, useNavigation } from "react-router";
import Spinner from "ui/Spinner";
import { useMusic } from "./MusicContext";

export default function Menu() {
	const navigation = useNavigation();
	const navigate = useNavigate();
  const music = useMusic();

	if (navigation.state === "loading" || navigation.state === "submitting") {
		return (
			<div className="flex items-center justify-center h-screen">
				<Spinner size={100} />
			</div>
		);
	}

    const handleStart = () => {
    music.setTrack("/app/music/d&d-acoustic.mp3"); // your music file path
    navigate("/quest/character-builder");
  };

	return (
		<div
			className="min-h-screen flex flex-col items-center justify-center bg-center bg-repeat-y bg-fixed"
			style={{
				backgroundImage: "url('/app/images/castle_wall_rpg.png')",
				backgroundSize: "cover",
			}}
		>
			<h1 className="text-8xl font-bold mb-6 text-white drop-shadow-lg">
				RPGpt
			</h1>
			<h1 className="text-2xl font-bold mb-6 text-white drop-shadow-lg">
				Your quest awaits!
			</h1>

			<button
				className="px-6 py-3 bg-green-900 text-white rounded-lg shadow hover:bg-green-950"
				onClick={handleStart}
			>
				Start Adventure
			</button>
		</div>
	);
}
