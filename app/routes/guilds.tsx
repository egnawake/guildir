import type { Route } from './+types/guilds';
import data from '../data';
import GuildCard from '../guild-card/guild-card';

export function loader() {
  return { guilds: data.guilds.getAll() }; 
}

export default function Guilds({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <h1>Guilds</h1>
      {loaderData.guilds.map(guild => (
        <GuildCard key={guild.id} {...guild} />
      ))}
    </>
  );
}
