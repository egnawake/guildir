import { Form, redirect, data as routerData } from 'react-router';
import { useId } from 'react';
import type { Route } from './+types/login';
import { createClient } from '../supabase.server';

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  const { supabase, headers } = createClient(request);
  const { data, error } = await supabase.auth.signInWithPassword({
    email: username,
    password
  });

  if (error) {
    console.error(error);
    return redirect('/error', { headers });
  }

  return routerData({}, { headers });
}

export default function Login() {
  const id = useId();

  return (
    <Form method="post">
      <label htmlFor={`${id}-username`}>Username</label>
      <input type="text" name="username" id={`${id}-username`} />

      <label htmlFor={`${id}-password`}>Password</label>
      <input type="password" name="password" id={`${id}-password`} />

      <button type="submit">Login</button>
    </Form>
  );
}
