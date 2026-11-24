import { NextRequest, NextResponse } from 'next/server';
import { API_URL, fixSetCookie } from '@/lib/api/config';

const privateRoutes = ['/journey', '/diary', '/profile'];
const authRoutes = ['/auth'];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const accessToken = req.cookies.get('accessToken')?.value;
  const refreshToken = req.cookies.get('refreshToken')?.value;

  let isLoggedIn = Boolean(accessToken);
  let newCookies: string[] = [];

  // access-токен прострочився, але refresh ще є — пробуємо оновити сесію
  if (!accessToken && refreshToken) {
    try {
      const res = await fetch(`${API_URL}/auth/session`, {
        headers: { cookie: req.headers.get('cookie') ?? '' },
        cache: 'no-store',
      });
      if (res.ok) {
        isLoggedIn = true;
        newCookies = res.headers.getSetCookie().map(fixSetCookie);
      }
    } catch {
      // якщо бекенд недоступний — вважаємо, що користувач не залогінений
    }
  }

  const isPrivate = privateRoutes.some((route) => pathname.startsWith(route));
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  let response: NextResponse;
  if (isPrivate && !isLoggedIn) {
    response = NextResponse.redirect(new URL('/auth/login', req.url));
  } else if (isAuthRoute && isLoggedIn) {
    response = NextResponse.redirect(new URL('/', req.url));
  } else {
    response = NextResponse.next();
  }

  newCookies.forEach((cookie) => response.headers.append('set-cookie', cookie));
  return response;
}

export const config = {
  matcher: ['/journey/:path*', '/diary/:path*', '/profile/:path*', '/auth/:path*'],
};
