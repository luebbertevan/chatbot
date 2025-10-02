import { useState } from "react";
import { Form, Link, useNavigate } from "react-router";
import Spinner from "ui/Spinner";
import { authClient } from "~/lib/auth-client";

export default function SignIn() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);

	const signIn = async (event: React.FormEvent) => {
		event?.preventDefault();

		try {
			setLoading(true);
			await authClient.signIn.email(
				{ email, password },
				{
					onRequest: () => {<Spinner size={70}/>}, // optional, loading already true
					onSuccess: (ctx) => navigate("/quest"),
					onError: (ctx) => alert("Sign In Error"),
				}
			);
		} catch (err) {
			alert("Sign In Failed");
		} finally {
			setLoading(false); // always stop spinner
		}
	};
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50">
			<div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8">
				<h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
					Sign In
				</h2>
				{loading ? (
					<Spinner size={70} />
				) : (
					<Form onSubmit={signIn} className="space-y-5">
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium text-gray-700"
							>
								Email
							</label>
							<input
								type="email"
								value={email}
								required
								onChange={(e) => setEmail(e.target.value)}
								className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
								placeholder="you@example.com"
							/>
						</div>

						<div>
							<label
								htmlFor="password"
								className="block text-sm font-medium text-gray-700"
							>
								Password
							</label>
							<input
								type="password"
								value={password}
								required
								onChange={(e) => setPassword(e.target.value)}
								className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
								placeholder="••••••••"
							/>
						</div>

						<button
							type="submit"
							className="w-full flex justify-center rounded-lg bg-indigo-600 px-4 py-2 text-white font-semibold shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
						>
							Log In
						</button>
					</Form>
				)}
				<p className="mt-6 text-center text-sm text-gray-600">
					Don't have an account?{" "}
					<Link
						to="/signUp"
						className="m-2 px-2 py-1 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700"
					>
						Sign Up
					</Link>
					<Link
						to="/"
						className="m-2 px-2 py-1 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700"
					>
						Home
					</Link>
				</p>
			</div>
		</div>
	);
}
