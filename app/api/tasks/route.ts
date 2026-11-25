export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { api } from '../api';
import { errorResponse, getCookieHeader } from '../_utils/utils';

export async function GET(req: NextRequest) {
  try {
    const res = await api.get('/tasks', {
      params: Object.fromEntries(req.nextUrl.searchParams),
      headers: await getCookieHeader(),
    });
    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const res = await api.post('/tasks', body, {
      headers: await getCookieHeader(),
    });
    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    return errorResponse(error);
  }
}
