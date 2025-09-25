import type { Route } from './+types/create';
import { Form, redirect, data as routerData } from 'react-router';
import GuildForm from '../../guild-form/guild-form';
import { createClient } from '../../supabase.server';

export async function loader({ request }: Route.LoaderArgs) {
  const { supabase, headers } = createClient(request);

  const tags = await supabase.from('tags').select('id, name');
  const games = await supabase.from('games').select('id, name');

  if (tags.error !== null) {
    console.error(tags.error);
    return redirect('/error', { headers });
  }

  if (games.error !== null) {
    console.error(games.error);
    return redirect('/error', { headers });
  }

  return { tags: tags.data, games: games.data };
}

export async function action({
  request
}: Route.ActionArgs) {
  const formData = await request.formData();

  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const icon = 'cat_icon.jpg';
  const tags = formData.getAll('tag');
  const games = formData.getAll('game');

  const { supabase, headers } = createClient(request);

  const { data: { user } } = await supabase.auth.getUser();
  if (user === null) {
    return redirect('/error', { headers });
  }

  const createdBy = user.id;
  const { error } = await supabase.rpc('create_guild', {
    name, description, icon, tags, games, created_by: createdBy
  });

  if (error !== null) {
    console.error(error);
    return redirect('/error', { headers });
  }

  return routerData({ status: 'ok', name: formData.get('name') as string },
    { headers });
}

export default function Component({ loaderData, actionData }: Route.ComponentProps) {
  return (
    <>
      <GuildForm
        id={null}
        tags={loaderData.tags}
        games={loaderData.games}
      />
      {actionData && (
        <p>{actionData.name} created</p>
      )}
    </>
  );
}
