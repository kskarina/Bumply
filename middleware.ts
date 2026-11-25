import { NextRequest, NextResponse } from 'next/server';
import { parseSetCookie } from 'cookie';

// У Next.js 15 цей файл називається middleware.ts (у Next.js 16 — proxy.ts).
// Middleware працює в Edge-середовищі, тому тут fetch, а не axios.
const BACKEND_URL = process.env.BACKEND_URL ?? 'https://lehlehka.b.goit.study';

const privateRoutes = ['/journey', '/diary', '/profile'];
const publicRoutes = ['/auth'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
  const isPrivateRoute = privateRoutes.some(route =>
    pathname.startsWith(route)
  );

  if (!accessToken) {
    if (refreshToken) {
      // access-токен прострочився — пробуємо оновити сесію
      const setCookie = await refreshSession(request);

      if (setCookie) {
        const response = isPublicRoute
          ? NextResponse.redirect(new URL('/', request.url))
          : NextResponse.next();

        for (const cookieStr of setCookie) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { name, value, domain, ...options } = parseSetCookie(cookieStr);
          if (value) {
            response.cookies.set(name, value, options);
          }
        }
        return response;
      }
    }

    if (isPublicRoute) {
      return NextResponse.next();
    }

    if (isPrivateRoute) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  if (isPublicRoute) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (isPrivateRoute) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

async function refreshSession(request: NextRequest): Promise<string[] | null> {
  try {
    const res = await fetch(`${BACKEND_URL}/auth/session`, {
      headers: { Cookie: request.headers.get('cookie') ?? '' },
      cache: 'no-store',
    });
    if (!res.ok) return null;
    const setCookie = res.headers.getSetCookie();
    return setCookie.length ? setCookie : null;
  } catch {
    return null;
  }
}

export const config = {
  matcher: [
    '/journey/:path*',
    '/diary/:path*',
    '/profile/:path*',
    '/auth/:path*',
  ],
};
