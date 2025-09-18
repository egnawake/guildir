import { redirect } from 'react-router';
import type { EmailOtpType } from '@supabase/supabase-js';
import type { Route } from './+types/confirm';
import { createClient } from '../../supabase.server';

export async function loader({ request }: Route.LoaderArgs) {
  const requestUrl = new URL(request.url);
  const tokenHash = requestUrl.searchParams.get('token_hash');
  const type = requestUrl.searchParams.get('type') as EmailOtpType | null;
  const next = requestUrl.searchParams.get('next') || '/';

  const { supabase, headers } = createClient(request);

  if (tokenHash && type) {
    const { error } = await supabase.auth.verifyOtp({
      type, token_hash: tokenHash
    });

    if (!error) {
      return redirect(next, { headers });
    }
  }

  return redirect('/auth/auth-code-error', { headers });
}
