import { NextRequest, NextResponse } from 'next/server';
import { api } from '../../api';
import { errorResponse, saveCookies } from '../../_utils/utils';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const apiRes = await api.post('/auth/register', body);

    const saved = await saveCookies(apiRes.headers['set-cookie']);
    if (saved) {
      return new NextResponse(null, { status: apiRes.status });
    }

    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  } catch (error) {
    return errorResponse(error);
  }
}
