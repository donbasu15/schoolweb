import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'vidyalaya_secret_token_key_school_2026_super_secure'
);

const SESSION_COOKIE_NAME = 'vidyalaya_session';
const INSPECTOR_COOKIE_NAME = 'vidyalaya_inspector_session';

async function decryptJWT(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch (error) {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect Admin Workspace
  if (pathname.startsWith('/admin')) {
    // Allow admin login page and its resources
    if (pathname === '/admin/login') {
      return NextResponse.next();
    }

    const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    const payload = await decryptJWT(token);
    if (!payload || (payload.role !== 'admin' && payload.role !== 'staff')) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // Protect Inspector Hub
  if (pathname.startsWith('/board-inspection-hub')) {
    if (pathname === '/board-inspection-hub/login') {
      return NextResponse.next();
    }

    const token = request.cookies.get(INSPECTOR_COOKIE_NAME)?.value;
    if (!token) {
      return NextResponse.redirect(new URL('/board-inspection-hub/login', request.url));
    }

    const payload = await decryptJWT(token);
    if (!payload || payload.role !== 'inspector') {
      return NextResponse.redirect(new URL('/board-inspection-hub/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/board-inspection-hub/:path*'],
};
