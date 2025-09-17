import { data as routerData } from 'react-router';
import type { Route } from './+types/guilds';
import GuildCard from '../guild-card/guild-card';
import { createClient } from '../supabase.server';

export async function loader({ request }: Route.LoaderArgs) {
  const { supabase, headers } = createClient(request);

  const { status, data, error } = await supabase.from('guilds').select(`
    id,
    name,
    icon,
    description,
    tags (
      name
    ),
    games (
      name
    )
  `);

  if (error) {
    console.error('Supabase error:', error);
  }

  const guilds = error === null ? data.map(guild => {
    const { data: iconData } = supabase.storage
      .from('guild_icons')
      .getPublicUrl(guild.icon);
    const icon = iconData.publicUrl;

    return {
      ...guild,
      icon,
      tags: guild.tags.map(tag => tag.name),
      games: guild.games.map(game => game.name),
    };
  }) : null;

  return routerData({ status, guilds }, { headers });
}

function Error({ status, message }: { status: number, message: string }) {
  return (
    <div>
      <h2>Error ({status})</h2>
      <p>{message}</p>
    </div>
  );
}

export default function Guilds({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <h1>Guilds</h1>
      {loaderData.guilds === null
        ? <Error
            status={loaderData.status}
            message="Something went wrong"
          />
        : loaderData.guilds.map(guild => (
            <GuildCard key={guild.id} {...guild} />
          ))
      }
    </>
  );
}
