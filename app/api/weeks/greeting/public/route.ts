export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { api } from '../../../api';
import { errorResponse } from '../../../_utils/utils';

export async function GET() {
  try {
    const res = await api.get('/weeks/greeting/public');
    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    return errorResponse(error);
  }
}
