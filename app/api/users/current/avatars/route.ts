import { NextRequest, NextResponse } from 'next/server';
import { api } from '../../../api';
import { errorResponse, getCookieHeader } from '../../../_utils/utils';

export async function PATCH(req: NextRequest) {
  try {
    const formData = await req.formData();
    const res = await api.patch('/users/current/avatars', formData, {
      headers: await getCookieHeader(),
    });
    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    return errorResponse(error);
  }
}
