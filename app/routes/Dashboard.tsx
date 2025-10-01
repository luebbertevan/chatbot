import { redirect, useNavigation, type LoaderFunctionArgs } from "react-router";
import type { Route } from "./+types/dashboard"; 
import Spinner from "ui/Spinner";


export async function loader({ request }: LoaderFunctionArgs) {
    const url = new URL(request.url);

  const res = await fetch(`${url.origin}/api/session`, {
    headers: request.headers, // pass cookies for auth
  });

  if (res.status === 401) throw redirect("/signIn");

  const data = await res.json();
  return { user: data.user };
}


export default function Dashboard({ loaderData }: Route.ComponentProps) {
  const user = loaderData.user;
    const navigation = useNavigation();

  if (navigation.state === "loading" || navigation.state === "submitting") {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner size={100} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p>Welcome, <span className="text-indigo-600">{user.name || user.email}!</span></p>
    </div>
  );
}

