import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  const localeMatch = pathname.match(/^\/(ar|fr|en)/);
  const locale = localeMatch ? localeMatch[1] : 'fr';

  const isDashboard = pathname.includes('/dashboard');
  const isAuth = pathname.includes('/auth');

  if (!user && isDashboard) {
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}/auth/login`;
    return NextResponse.redirect(url);
  }

  if (user && isAuth) {
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}/dashboard`;
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
