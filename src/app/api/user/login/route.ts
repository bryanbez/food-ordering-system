import { NextRequest, NextResponse } from "next/server";
import { loginUserService } from "@/app/lib/db/services/user.service";
import type { LoginUserInput } from "@/app/types/authTypes";
import dbConnect from "@/app/lib/db/config/connection";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  const body: LoginUserInput = await request.json();

  if (!body.email || !body.password) {
    return NextResponse.json(
      { error: "Missing email or password" },
      { status: 400 }
    );
  }

  try {
    await dbConnect();
    const user = await loginUserService(body);

    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    if (!jwtSecretKey) {
      throw new Error("JWT_SECRET_KEY is not defined");
    }

    const token = jwt.sign({ userId: user._id }, jwtSecretKey, {
      expiresIn: "3d",
    });

    const response = NextResponse.json({
      message: "Login successful",
      user: {
        _id: user._id,
        email: user.email,
      },
    });
    response.cookies.set("loginToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 3, // 3 days
    });

    return response;
  } catch (error: unknown) {
    let errorMessage = "Invalid email or password";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ error: errorMessage }, { status: 401 });
  }
}
//
