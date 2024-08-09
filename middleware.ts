import NextAuth, { Session } from 'next-auth';
import authConfig from './auth.config';
import {
  apiAuthPrefix,
  AUTH_ROUTES,
  URL as defaultRoute,
  PUBLIC_ROUTES,
} from './routes';
import { NextRequest, NextResponse } from 'next/server';

const { auth } = NextAuth(authConfig);

export default auth((req: NextRequest & { auth: Session | null }) => {
  const { nextUrl } = req;
  const isAuthenticated = Boolean(req.auth);

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);
  const isAuthRoute = AUTH_ROUTES.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  if (isAuthRoute) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL(defaultRoute, nextUrl));
    } else {
      return NextResponse.next();
    }
  }

  if (!isAuthenticated && !isPublicRoute) {
    if (nextUrl.pathname.includes('api')) {
      return NextResponse.json(
        {
          message: 'Accès refusé',
        },
        {
          status: 401,
        }
      );
    }

    return Response.redirect(
      new URL('/authentification/connexion', nextUrl)
    );
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
