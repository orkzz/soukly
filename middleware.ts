import createMiddleware from 'next-intl/middleware';
import { routing } from './src/routing';
import type { NextRequest } from 'next/server';

const handleI18nRouting = createMiddleware(routing);

export function middleware(request: NextRequest) {
  return handleI18nRouting(request);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|fonts|images|models|locales|api).*)'],
};
