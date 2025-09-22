import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("guilds", "routes/guilds.tsx"),
  route("manage", "routes/manage/index.tsx"),
  route("manage/create", "routes/manage/create.tsx"),
  route("manage/edit/:id", "routes/manage/edit.tsx"),
  route("signup", "routes/signup.tsx"),
  route("login", "routes/login.tsx"),
  route("logout", "routes/logout.tsx"),
  route("auth/confirm", "routes/auth/confirm.tsx"),
  route("error", "routes/error.tsx"),
] satisfies RouteConfig;
