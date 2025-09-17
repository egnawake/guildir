import type { Route } from './+types/edit';
import { Form, redirect } from 'react-router';
import data from '../../data';
import GuildForm from '../../guild-form/guild-form';

export function loader({ params }: Route.LoaderArgs) {
  const id = Number.parseInt(params.id);

  const guild = data.guilds.get(id);

  if (guild === undefined) {
    throw redirect('/guilds');
  }

  const tags = data.guilds.getTags();
  const games = data.guilds.getGames();

  return { tags, games, guild };
}

export async function clientAction({
  request
}: Route.ClientActionArgs) {
  const formData = await request.formData();
  return { status: 'ok', name: formData.get('name') as string };
}

export default function Component({ loaderData, actionData }: Route.ComponentProps) {
  return (
    <>
      <GuildForm
        id={loaderData.guild.id}
        tags={loaderData.tags}
        games={loaderData.games}
        prefill={{
          name: loaderData.guild.name,
          description: loaderData.guild.description,
          tags: loaderData.guild.tags,
          games: loaderData.guild.games,
        }}
      />
      {actionData && (
        <p>{actionData.name} updated</p>
      )}
    </>
  );
}
