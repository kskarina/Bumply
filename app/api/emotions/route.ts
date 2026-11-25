import { NextRequest, NextResponse } from 'next/server';
import { api } from '../api';
import { errorResponse } from '../_utils/utils';

export async function GET(req: NextRequest) {
  try {
    const res = await api.get('/emotions', {
      params: Object.fromEntries(req.nextUrl.searchParams),
    });
    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    return errorResponse(error);
  }
}
