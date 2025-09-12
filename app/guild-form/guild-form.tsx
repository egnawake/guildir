import { useState, useId } from 'react';
import { Form } from 'react-router';

interface Prefill {
  name: string;
  description: string;
  tags: string[];
  games: string[];
}

interface GuildFormProps {
  id?: number;
  tags: string[];
  games: string[];
  prefill?: Prefill;
}

const defaultValues = {
  name: '',
  description: '',
  tags: [],
  games: [],
};

export default function GuildForm({
  id = null,
  tags,
  games,
  prefill = defaultValues
}: GuildFormProps) {
  const renderId = useId();
  const [status, setStatus] = useState<'filling' | 'submitting'>('filling');

  return (
    <Form method="post" action={id === null ? '/manage/create' : `/manage/edit/${id}`}>
      <label htmlFor={`${renderId}-name`}>Name</label>
      <input
        type="text"
        id={`${renderId}-name`}
        name="name"
        defaultValue={prefill['name']}
      />

      <label htmlFor={`${renderId}-description`}>Description</label>
      <textarea
        id={`${renderId}-description`}
        name="description"
        defaultValue={prefill['description']}
      />

      <fieldset>
        <legend>Tags</legend>
        {tags.map(tag => {
          return (
            <div key={tag}>
              <input
                type="checkbox"
                id={`${renderId}-tags-${tag}`}
                name="tag"
                value={tag}
                defaultChecked={prefill['tags'].includes(tag)}
              />
              <label htmlFor={`${renderId}-tags-${tag}`}>
                {tag}
              </label>
            </div>
          );
        })}
      </fieldset>

      <fieldset>
        <legend>Games</legend>
        {games.map(game => {
          return (
            <div key={game}>
              <input
                type="checkbox"
                id={`${renderId}-game-${game}`}
                name="game"
                value={game}
                defaultChecked={prefill['games'].includes(game)}
              />
              <label htmlFor={`${renderId}-game-${game}`}>
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
  );
}
