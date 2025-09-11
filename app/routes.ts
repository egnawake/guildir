import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("guilds", "routes/guilds.tsx"),
] satisfies RouteConfig;
