// proxy.ts (à la racine du projet)
import { NextRequest, NextResponse } from 'next/server';

const allowedOrigins = (process.env.CORS_ORIGINS || 'http://localhost:3000').split(',');

export function proxy(request: NextRequest) {
  const url = request.nextUrl;
  const response = NextResponse.next();

  // Headers de sécurité 2026
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: https: blob:",
    "font-src 'self' https://fonts.gstatic.com",
    "connect-src 'self' https://www.google-analytics.com https://indexing.googleapis.com",
    "frame-src 'none'",
    "object-src 'none'",
  ].join('; ');
  
  response.headers.set('Content-Security-Policy', csp);

  // CORS pour API
  if (url.pathname.startsWith('/api/')) {
    const origin = request.headers.get('origin');
    if (origin && !allowedOrigins.includes(origin) && process.env.NODE_ENV === 'production') {
      return new NextResponse('Origin not allowed', { status: 403 });
    }
  }

  // Protection admin
  if (url.pathname.startsWith('/admin') && url.pathname !== '/admin/login') {
    const token = request.cookies.get('auth_token');
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // Bloquer bots malveillants
  const userAgent = request.headers.get('user-agent') || '';
  const blockedBots = ['Bytespider', 'AhrefsBot', 'SemrushBot'];
  if (blockedBots.some(bot => userAgent.includes(bot))) {
    return new NextResponse('Access Denied', { status: 403 });
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)'],
};