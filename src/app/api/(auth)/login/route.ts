import { NextResponse } from "next/server";
import { SignJWT } from "jose";

function getSecretKey() {
  return new TextEncoder().encode(process.env.JWT_SECRET!);
}

const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com";
const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (email === adminEmail && password === adminPassword) {
    const token = await new SignJWT({ email }).setProtectedHeader({ alg: "HS256" }).setExpirationTime("1d").sign(getSecretKey());

    const response = NextResponse.json({ success: true });
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });

    return response;
  }

  return NextResponse.json({ success: false, message: "Wrong email or password" }, { status: 401 });
}
