import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const isPublicPath = path === "/login" || path === "/signup" || path === "/verifyemail"
    const token = request.cookies.get("token")?.value || "";

    if(isPublicPath && token){
        return NextResponse.redirect(new URL("/", request.nextUrl));
    }
    if(!isPublicPath && !token){
        return NextResponse.redirect(new URL("/login", request.nextUrl));
    }
}

export const config = {
    matcher: ["/", "/profile", "/signup", "/login", "/verifyemail"]
}


/*
path gets the URL path the visitor is trying to open
Public pages are ones you don’t need to be logged in to see. Everything else is treated as protected.
It looks in the browser’s cookies for one named token. If it’s missing, token becomes an empty string, which counts as “false” in JavaScript.
matcher tells Next.js to run the middleware only on these routes. Any other route skips the guard entirely.

The browser stores a cookie named token. Every time the browser makes a request to the site, it automatically attaches all matching cookies in the request headers, like this:
GET /profile
Cookie: token=eyJhbGciOiJIUzI1NiIs...
Next.js middleware receives that request, and request.cookies.get("token") reads the cookie out of those headers.
*/