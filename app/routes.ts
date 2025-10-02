import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
	index("routes/home.tsx"),
	route("api/auth/*", "routes/api.auth.$.ts"),
	route("signUp", "routes/signUp.tsx"),
	route("signIn", "routes/signIn.tsx"),

	route("quest", "routes/protected.tsx", [
		index("routes/menu.tsx"),
		route("character-builder", "routes/characterBuilder.tsx"),
		route("story-builder", "routes/storyBuilder.tsx"),
		route("adventure", "routes/chat.tsx"),
		route("ai", "routes/ai.tsx"),
	])

] satisfies RouteConfig;
