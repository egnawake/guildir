import { useId, useState } from 'react';
import { createClient } from '../supabase.server';
import type { Route } from './+types/signup';
import { data as routerData, redirect, Form } from 'react-router';

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (email === null || password === null) {
    return redirect('/error');
  }

  const { supabase, headers } = createClient(request);

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: 'http://localhost:5173'
    }
  });

  if (error) {
    console.error(error);
    return redirect('/error');
  }

  return routerData({ status: 'ok' }, { headers });
}

export default function Signup() {
  const id = useId();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Form method="post">
      <label htmlFor={`${id}-email`}>Email</label>
      <input
        type="email"
        name="email"
        id={`${id}-email`}
      />

      <label htmlFor={`${id}-password`}>Password</label>
      <input
        type="password"
        name="password"
        id={`${id}-password`}
      />

      <button type="submit">Sign up</button>
    </Form>
  );
}
