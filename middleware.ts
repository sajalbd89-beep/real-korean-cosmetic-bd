// middleware.ts
export async function middleware(req: NextRequest) {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session || session.user.user_metadata.role !== 'admin') {
    return NextResponse.redirect(new URL('/login', req.url));
  }
}
export const config = { matcher: ['/admin/:path*'] };
