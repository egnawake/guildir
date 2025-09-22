import { Link } from "react-router";
import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Home - Guildir" },
    { name: "description", content: "Find your next MMO guild" },
  ];
}

export default function Home() {
  return (
    <>
      <nav>
        <Link to="/guilds">Guilds</Link>
      </nav>
    </>
  );
}
