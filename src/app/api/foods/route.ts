import { getAllFoodsService } from "@/app/lib/db/services/food.service";
import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/db/config/connection";

export async function GET() {
  try {
    await dbConnect();
    const foods = await getAllFoodsService();
    return NextResponse.json(foods);
  } catch (error) {
    console.error("Error fetching foods:", error);
    return NextResponse.json(
      { error: "Failed to fetch foods" },
      { status: 500 }
    );
  }
}
