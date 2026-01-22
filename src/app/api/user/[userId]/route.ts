import {
  getUserByIdService,
  updateUserProfileService,
} from "@/app/lib/db/services/user.service";
import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/db/config/connection";

type ParamType = {
  params: Promise<{
    userId: string;
  }>;
};

export async function GET(request: Request, props: ParamType) {
  const params = await props.params;
  const { userId } = params;
  try {
    await dbConnect();
    const user = await getUserByIdService(userId);
    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    return NextResponse.json(
      { error: "Failed to fetch user by ID" },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request, props: ParamType) {
  const params = await props.params;
  const { userId } = params;
  try {
    await dbConnect();
    const body = await request.json();
    const updatedUser = await updateUserProfileService(userId, body);
    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error updating user by ID:", error);
    return NextResponse.json(
      { error: "Failed to update user by ID" },
      { status: 500 },
    );
  }
}
