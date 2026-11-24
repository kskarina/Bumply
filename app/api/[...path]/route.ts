import { NextRequest, NextResponse } from 'next/server';
import { API_URL, fixSetCookie } from '@/lib/api/config';

type Context = { params: Promise<{ path: string[] }> };

// Усі запити з браузера йдуть на /api/..., а звідси пересилаються на бекенд.
// Так cookie з токенами зберігаються на нашому домені.
async function proxy(req: NextRequest, { params }: Context) {
  const { path } = await params;
  const url = `${API_URL}/${path.join('/')}${req.nextUrl.search}`;

  const headers = new Headers();
  const contentType = req.headers.get('content-type');
  const cookie = req.headers.get('cookie');
  if (contentType) headers.set('content-type', contentType);
  if (cookie) headers.set('cookie', cookie);

  const hasBody = req.method !== 'GET' && req.method !== 'HEAD';

  try {
    const backendRes = await fetch(url, {
      method: req.method,
      headers,
      body: hasBody ? await req.arrayBuffer() : undefined,
      cache: 'no-store',
    });

    const body = backendRes.status === 204 ? null : await backendRes.arrayBuffer();
    const res = new NextResponse(body, { status: backendRes.status });

    const resType = backendRes.headers.get('content-type');
    if (resType) res.headers.set('content-type', resType);

    for (const c of backendRes.headers.getSetCookie()) {
      res.headers.append('set-cookie', fixSetCookie(c));
    }

    return res;
  } catch {
    return NextResponse.json({ message: 'Сервер недоступний' }, { status: 502 });
  }
}

export { proxy as GET, proxy as POST, proxy as PATCH, proxy as PUT, proxy as DELETE };
