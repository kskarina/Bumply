import { NextRequest, NextResponse } from 'next/server';
import { api } from '../../api';
import { errorResponse, getCookieHeader } from '../../_utils/utils';

type Props = {
  params: Promise<{ noteId: string }>;
};

export async function PATCH(req: NextRequest, { params }: Props) {
  try {
    const { noteId } = await params;
    const body = await req.json();
    const res = await api.patch(`/diary/${noteId}`, body, {
      headers: await getCookieHeader(),
    });
    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function DELETE(_req: NextRequest, { params }: Props) {
  try {
    const { noteId } = await params;
    const res = await api.delete(`/diary/${noteId}`, {
      headers: await getCookieHeader(),
    });
    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    return errorResponse(error);
  }
}
