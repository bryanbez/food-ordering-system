import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete("loginToken");
  return NextResponse.json({ message: "Logout successful" });
}
