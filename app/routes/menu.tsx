import { useNavigate, useNavigation } from "react-router";
import Spinner from "ui/Spinner";

export default function Menu() {
  const navigation = useNavigation();
  const navigate = useNavigate();

  if (navigation.state === "loading" || navigation.state === "submitting") {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner size={100} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Your quest awaits!</h1>

      <button
        className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700"
        onClick={() => navigate("/protected/chat")}
      >
        Start Adventure
      </button>
    </div>
  );
}
