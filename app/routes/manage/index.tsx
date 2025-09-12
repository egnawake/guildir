import type { Route } from './+types/index';
import { Link } from 'react-router';
import data from '../../data';

export function loader() {
  return { guilds: data.guilds.getAll() };
}

export default function Component({ loaderData }: Route.ComponentProps) {
  return (
    <ul>
    {loaderData.guilds.map(guild => (
      <li key={guild.id}>
        <GuildEntry {...guild} />
      </li>
    ))}
    </ul>
  );
}

function GuildEntry({ id, name }: { id: number; name: string; }) {
  return (
    <div>
      <Link to={`edit/${id}`}>{name}</Link>
    </div>
  );
}
