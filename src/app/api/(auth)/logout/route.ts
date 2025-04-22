import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("token");

  if (!token) {
    return NextResponse.json({ message: "You're not logged in. No active session found." }, { status: 400 });
  }

  // Make response
  const response = NextResponse.json({ message: "Successfully logged out." });

  // Clear the token
  response.cookies.set("token", "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });

  return response;
}
