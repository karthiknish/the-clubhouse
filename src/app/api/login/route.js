import { NextResponse } from "next/server";

const USERNAME = "admin";
const PASSWORD = "admin1!";
const SESSION_VALUE = "admin-session";
const COOKIE_NAME = "admin-token";

export async function POST(request) {
  const { username, password } = await request.json();

  if (username === USERNAME && password === PASSWORD) {
    const response = NextResponse.json({ success: true });
    response.cookies.set(COOKIE_NAME, SESSION_VALUE, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 8,
    });
    return response;
  }

  return NextResponse.json(
    { success: false, message: "Invalid credentials" },
    { status: 401 }
  );
}
