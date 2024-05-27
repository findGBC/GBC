// Imports
// ========================================================
import { NextResponse, type NextRequest } from "next/server";

// Config
// ========================================================
const corsOptions: {
  allowedMethods: string[];
  allowedOrigins: string[];
} = {
  allowedMethods: (process.env?.ALLOWED_METHODS || "GET").split(","),
  allowedOrigins: (process.env?.GBC_DOMAIN || "").split(","),
};

// Middleware
// ========================================================
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  // Response
  const response = NextResponse.next();

  // Allowed origins check
  const origin = request.headers.get('origin') ?? '';
  if (corsOptions.allowedOrigins.includes('*') || corsOptions.allowedOrigins.includes(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin);
  }

  // Set default CORS headers
  response.headers.set("Access-Control-Allow-Methods", corsOptions.allowedMethods.join(","));

  // Return
  return response;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/api/:path*",
};