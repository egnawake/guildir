import type { Route } from './+types/guilds';
import GuildCard from '../guild-card/guild-card';
import avatar from '../cat.jpg';

const guilds = [
  {
    id: 0,
    name: 'Guild 1',
    icon: avatar,
    description: 'Guild 1 description.',
    tags: ['PvE'],
    games: ['Guild Wars 2'],
  },
  {
    id: 1,
    name: 'Guild 2',
    icon: avatar,
    description: 'Guild 2 description.',
    tags: ['Social'],
    games: ['World of Warcraft'],
  },
];

export function loader() {
  return { guilds: guilds }; 
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
