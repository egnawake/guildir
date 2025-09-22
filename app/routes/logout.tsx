import { Link, redirect, data as routerData } from 'react-router';
import type { Route } from './+types/logout';
import { createClient } from '../supabase.server';

export async function action({ request }: Route.ActionArgs) {
  const { supabase, headers } = createClient(request);

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error(error);
    return redirect('/error', { headers });
  }

  const status = error !== null;

  return routerData({ status }, { headers });
}

export default function Logout({ actionData }: Route.ComponentProps) {
  return (
    <>
      <p>Logged out successfully</p>
      <Link to="/">Home</Link>
    </>
  );
}
