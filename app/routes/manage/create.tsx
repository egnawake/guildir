import type { Route } from './+types/form';
import { Form } from 'react-router';
import data from '../../data';
import GuildForm from '../../guild-form/guild-form';

export function loader() {
  const tags = data.guilds.getTags();
  const games = data.guilds.getGames();

  return { tags, games };
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
        tags={loaderData.tags}
        games={loaderData.games}
      />
      {actionData && (
        <p>{actionData.name} created</p>
      )}
    </>
  );
}
