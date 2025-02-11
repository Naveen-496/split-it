import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    console.log("Middleware has entered");
    const userSession = request.cookies.get("session");
    console.log("User session", userSession);
    const url = request.nextUrl.pathname;
    if (url.includes("/auth/verify-token")) {
        console.log("Verifying token");
        return NextResponse.next();
    }
    if (!userSession) {
        console.log("Did not login!!");
        return NextResponse.redirect(new URL('/auth/sign-in', request.url));
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/',
}