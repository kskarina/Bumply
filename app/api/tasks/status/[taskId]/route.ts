import { NextRequest, NextResponse } from 'next/server';
import { api } from '../../../api';
import { errorResponse, getCookieHeader } from '../../../_utils/utils';

type Props = {
  params: Promise<{ taskId: string }>;
};

export async function PATCH(req: NextRequest, { params }: Props) {
  try {
    const { taskId } = await params;
    const body = await req.json();
    const res = await api.patch(`/tasks/status/${taskId}`, body, {
      headers: await getCookieHeader(),
    });
    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    return errorResponse(error);
  }
}
