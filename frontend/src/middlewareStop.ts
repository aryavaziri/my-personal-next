import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

const cookieStore = cookies();
const token = cookieStore.get("accessToken")?.value;

export function middleware(request: NextRequest) {
  token && console.log(token);
  // return NextResponse.request(request);
  // //   console.log("request.headers");
  // if (request.nextUrl.pathname.startsWith("/dashboard")) {
  // }
}
