import createMiddleware from 'next-intl/middleware';
import { routing } from './src/routing';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';

const handleI18nRouting = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Run i18n routing first
  const i18nResponse = handleI18nRouting(request);

  // If i18n is redirecting (e.g. / -> /fr/), let it through
  if (i18nResponse.status !== 200) {
    return i18nResponse;
  }

  // Protect dashboard routes
  const isDashboard = /^\/(ar|fr|en)\/dashboard/.test(pathname);
  if (!isDashboard) return i18nResponse;

  // Check Supabase session
  let response = NextResponse.next({ request: { headers: request.headers } });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request: { headers: request.headers } });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    const locale = pathname.split('/')[1] || 'fr';
    return NextResponse.redirect(new URL(`/${locale}/auth/login`, request.url));
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|fonts|images|models|locales|api).*)'],
};
