import type { Route } from './+types/form';
import { useState, useId } from 'react';
import { Form } from 'react-router';
import data from '../../data';

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

export default function Component({ loaderData, params, actionData }: Route.ComponentProps) {
  const id = useId();
  const [status, setStatus] = useState<'filling' | 'submitting'>('filling');

  return (
    <>
      <Form method="post">
        <label htmlFor={`${id}-name`}>Name</label>
        <input
          type="text"
          id={`${id}-name`}
          name="name"
        />

        <label htmlFor={`${id}-description`}>Description</label>
        <textarea
          id={`${id}-description`}
          name="description"
        />

        <fieldset>
          <legend>Tags</legend>
          {loaderData.tags.map(tag => {
            return (
              <div key={tag}>
                <input
                  type="checkbox"
                  id={`${id}-tags-${tag}`}
                  name="tag"
                  value={tag}
                />
                <label htmlFor={`${id}-tags-${tag}`}>
                  {tag}
                </label>
              </div>
            );
          })}
        </fieldset>

        <fieldset>
          <legend>Games</legend>
          {loaderData.games.map(game => {
            return (
              <div key={game}>
                <input
                  type="checkbox"
                  id={`${id}-game-${game}`}
                  name="game"
                  value={game}
                />
                <label htmlFor={`${id}-game-${game}`}>
                  {game}
                </label>
              </div>
            );
          })}
        </fieldset>

        <button disabled={status === 'submitting'}>
          Submit
        </button>
      </Form>
      {actionData && (
        <p>{actionData.name} updated</p>
      )}
    </>
  );
}
