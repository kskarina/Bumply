export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { api } from '../../api';
import { errorResponse, getCookieHeader } from '../../_utils/utils';

export async function GET() {
  try {
    const res = await api.get('/users/current', {
      headers: await getCookieHeader(),
    });
    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const res = await api.patch('/users/current', body, {
      headers: await getCookieHeader(),
    });
    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    return errorResponse(error);
  }
}
