import createMiddleware from 'next-intl/middleware';
import { routing } from './src/routing';

export default createMiddleware(routing);

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|fonts|images|models|locales|api).*)'],
};
