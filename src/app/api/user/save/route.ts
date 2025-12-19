import { createUserService } from "@/app/lib/db/services/user.service";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/db/config/connection";

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    const user = await createUserService(body);
    return NextResponse.json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
