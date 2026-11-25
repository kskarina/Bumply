export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { api } from '../../api';
import { getCookieHeader, saveCookies } from '../../_utils/utils';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;
    const refreshToken = cookieStore.get('refreshToken')?.value;

    if (accessToken) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    if (!refreshToken) {
      return NextResponse.json({ success: false }, { status: 200 });
    }

    const apiRes = await api.get('/auth/session', {
      headers: await getCookieHeader(),
    });

    await saveCookies(apiRes.headers['set-cookie']);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json({ success: false }, { status: 200 });
  }
}
