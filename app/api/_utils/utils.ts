import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { isAxiosError } from 'axios';
import { parseSetCookie } from 'cookie';

export function logErrorResponse(errorObj: unknown): void {
  const green = '\x1b[32m';
  const yellow = '\x1b[33m';
  const reset = '\x1b[0m';

  console.log(`${green}> ${yellow}Error Response Data:${reset}`);
  console.dir(errorObj, { depth: null, colors: true });
}

export function errorResponse(error: unknown) {
  if (isAxiosError(error)) {
    logErrorResponse(error.response?.data);
    return NextResponse.json(
      {
        error: error.response?.data?.message ?? error.message,
        response: error.response?.data,
      },
      { status: error.response?.status ?? 500 }
    );
  }
  logErrorResponse({ message: (error as Error).message });
  return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
}

export async function saveCookies(setCookie: string[] | string | undefined) {
  if (!setCookie) return false;

  const cookieStore = await cookies();
  const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];

  for (const cookieStr of cookieArray) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { name, value, domain, ...options } = parseSetCookie(cookieStr);

    if (value) {
      cookieStore.set(name, value, options);
    }
  }
  return true;
}

export async function getCookieHeader() {
  const cookieStore = await cookies();
  return { Cookie: cookieStore.toString() };
}
