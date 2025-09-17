import {
  createServerClient,
  parseCookieHeader as _parseCookieHeader,
  serializeCookieHeader
} from '@supabase/ssr';

// The 'parseCookieHeader' function from '@supabase/ssr' is incompatible with the return type of 'getAll' in the cookie header object passed to 'createServerClient' (see https://github.com/supabase/ssr/issues/115)
function parseCookieHeader(header: string) {
  const cookiePairs = _parseCookieHeader(header);
  return cookiePairs.map(pair => ({
    ...pair,
    value: pair.value ?? ''
  }));
}

export function createClient(request: Request) {
  const headers = new Headers();

  const supabase = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return parseCookieHeader(request.headers.get('Cookie') ?? '');
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            headers.append('Set-Cookie', serializeCookieHeader(name, value, options));
          });
        },
      },
    }
  );

  return { supabase, headers };
}
