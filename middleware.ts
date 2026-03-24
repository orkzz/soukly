import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

const intlMiddleware = createMiddleware({
  locales: ['ar', 'fr', 'en'],
  defaultLocale: 'fr',
  localePrefix: 'always',
});

export async function middleware(request: NextRequest) {
  const intlResponse = intlMiddleware(request);

  if (intlResponse.status !== 200) {
    return intlResponse;
  }

  return updateSession(request);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|fonts|images|models|locales|api).*)'],
};
