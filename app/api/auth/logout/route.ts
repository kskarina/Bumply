import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { api } from '../../api';
import { errorResponse, getCookieHeader } from '../../_utils/utils';

export async function POST() {
  try {
    await api.post('/auth/logout', null, { headers: await getCookieHeader() });

    const cookieStore = await cookies();
    cookieStore.delete('accessToken');
    cookieStore.delete('refreshToken');

    return NextResponse.json({ message: 'Logged out successfully' });
  } catch (error) {
    return errorResponse(error);
  }
}
