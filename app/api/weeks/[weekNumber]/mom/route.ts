import { NextRequest, NextResponse } from 'next/server';
import { api } from '../../../api';
import { errorResponse, getCookieHeader } from '../../../_utils/utils';

type Props = {
  params: Promise<{ weekNumber: string }>;
};

export async function GET(_req: NextRequest, { params }: Props) {
  try {
    const { weekNumber } = await params;
    const res = await api.get(`/weeks/${weekNumber}/mom`, {
      headers: await getCookieHeader(),
    });
    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    return errorResponse(error);
  }
}
