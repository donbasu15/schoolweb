import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'vidyalaya_secret_token_key_school_2026_super_secure'
);

const SESSION_COOKIE_NAME = 'vidyalaya_session';
const INSPECTOR_COOKIE_NAME = 'vidyalaya_inspector_session';

export interface UserSession {
  userId: string;
  name: string;
  email: string;
  role: 'admin' | 'staff';
}

export interface InspectorSession {
  inspectorId: string;
  role: 'inspector';
}

// ----------------------------------------
// Token Operations
// ----------------------------------------
export async function encryptJWT(payload: any, expiry: string = '24h') {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expiry)
    .sign(JWT_SECRET);
}

export async function decryptJWT(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch (error) {
    console.error('JWT verification failed:', error);
    return null;
  }
}

// ----------------------------------------
// Session Management
// ----------------------------------------
export async function getSession(): Promise<UserSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;
  
  const payload = await decryptJWT(token);
  if (!payload || payload.role === 'inspector') return null;
  
  return {
    userId: payload.userId as string,
    name: payload.name as string,
    email: payload.email as string,
    role: payload.role as 'admin' | 'staff',
  };
}

export async function getInspectorSession(): Promise<InspectorSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(INSPECTOR_COOKIE_NAME)?.value;
  if (!token) return null;

  const payload = await decryptJWT(token);
  if (!payload || payload.role !== 'inspector') return null;

  return {
    inspectorId: payload.inspectorId as string,
    role: 'inspector',
  };
}

export async function loginUser(sessionData: UserSession) {
  const token = await encryptJWT(sessionData, '12h');
  const cookieStore = await cookies();
  cookieStore.set({
    name: SESSION_COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 12, // 12 hours
  });
}

export async function loginInspector() {
  const sessionData: InspectorSession = {
    inspectorId: 'inspector_' + Date.now(),
    role: 'inspector',
  };
  const token = await encryptJWT(sessionData, '2h'); // Short-lived 2 hours
  const cookieStore = await cookies();
  cookieStore.set({
    name: INSPECTOR_COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 2, // 2 hours
  });
}

export async function logoutUser() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function logoutInspector() {
  const cookieStore = await cookies();
  cookieStore.delete(INSPECTOR_COOKIE_NAME);
}
