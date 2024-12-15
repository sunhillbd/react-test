// import { NextResponse } from "next/server";
// // import { getToken } from "next-auth/jwt";
// // import jwt from "jsonwebtoken";

// export async function middleware(request) {
//   const token = request.cookies.get("authToken")?.value;
//   const userCookie = request.cookies.get("user")?.value;
//   const user = userCookie ? JSON.parse(userCookie) : null;
//   const { pathname } = request.nextUrl;

//   // Public business pages
//   const publicBusinessPaths = ["/business", "/business/register"];
//   const isPublicBusinessPath = publicBusinessPaths.some(
//     (path) => pathname === path
//   );

//   // Login/Register pages control
//   const authPages = ["/login", "/register", "/business/register"];
//   const isAuthPage = authPages.includes(pathname);

//   // Business panel pages check
//   const isBusinessPanelRoute =
//     pathname.startsWith("/business/") && !isPublicBusinessPath;
//   const isAccountRoute = pathname.startsWith("/account");
//   const isProtectedRoute = isBusinessPanelRoute || isAccountRoute;

//   if (isProtectedRoute) {
//     if (!token) {
//       return NextResponse.redirect(new URL("/login", request.url));
//     }

//     const isBusinessUser = user?.type === "business";

//     // Business route check
//     if (isBusinessPanelRoute && !isBusinessUser) {
//       return NextResponse.redirect(new URL("/account", request.url));
//     }

//     // Normal user route check
//     if (isAccountRoute && isBusinessUser) {
//       return NextResponse.redirect(new URL("/business/dashboard", request.url));
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public).*)"],
// };

import { NextResponse } from "next/server";

export async function middleware(request) {
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public).*)"],
};
