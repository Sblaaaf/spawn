import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Tu peux ajouter des vérifications ici plus tard
  // Pour l'instant, on laisse passer tout le monde
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*', '/betting/:path*'],
};
