import { getFoodByIdService } from "@/app/lib/db/services/food.service";
import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/db/config/connection";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    await dbConnect();
    const food = await getFoodByIdService(id);
    return NextResponse.json(food);
  } catch (error) {
    console.error("Error fetching food by ID:", error);
    return NextResponse.json(
      { error: "Failed to fetch food by ID" },
      { status: 500 },
    );
  }
}
