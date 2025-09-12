import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("guilds", "routes/guilds.tsx"),
  route("manage", "routes/manage/index.tsx"),
  route("manage/edit/:id", "routes/manage/form.tsx"),
] satisfies RouteConfig;
