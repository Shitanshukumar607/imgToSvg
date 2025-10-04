import { NextResponse, type NextRequest } from "next/server";

export const createClient = (request: NextRequest) => {
  // Create an unmodified response
  const supabaseResponse = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  return supabaseResponse;
};
