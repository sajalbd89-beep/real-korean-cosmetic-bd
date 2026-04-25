import { NextRequest, NextResponse } from 'next/server';
// যদি supabase use করো, client import করো
// import { createClient } from '@supabase/supabase-js';

export async function middleware(req: NextRequest) {
  try {
    // ⚠️ এখানে তুমি তোমার supabase client init করবে
    // const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

    // 🔥 NOTE: middleware এ সরাসরি getSession() অনেক সময় কাজ করে না
    // better approach: cookies/token check করা

    const token = req.cookies.get('sb-access-token');

    // যদি token না থাকে → redirect
    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    // চাইলে এখানে role check করতে পারো (decoded JWT)
    // basic version skip করা হলো simplicity এর জন্য

    return NextResponse.next();

  } catch (error) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

// 🔐 Protect admin routes
export const config = {
  matcher: ['/admin/:path*'],
};
