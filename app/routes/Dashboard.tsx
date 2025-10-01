import { authClient } from "~/lib/auth-client";

export default function Dashboard() {
  const { data, isPending, error } = authClient.useSession();

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error loading session: {error.message}</div>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p>Welcome, {data?.user?.name}!</p>
    </div>
  );
}
