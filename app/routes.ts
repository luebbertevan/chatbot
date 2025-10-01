import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
	index("routes/home.tsx"),
	route("api/auth/*", "routes/api.auth.$.ts"),
	route("signUp", "routes/signUp.tsx"),
	route("signIn", "routes/signIn.tsx"),
	route("protected", "routes/protected.tsx"),
	route("chat", "routes/chat.tsx" ),
	route("ai", "routes/ai.tsx"),
] satisfies RouteConfig;
