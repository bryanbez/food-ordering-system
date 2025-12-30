import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/db/config/connection";
import FoodModel from "@/app/lib/db/models/food.model";

export async function GET() {
  try {
    await dbConnect();
    const count = await FoodModel.countDocuments();
    const sample = await FoodModel.find().limit(5).select("id name");

    return NextResponse.json({
      message: "Debug Info",
      collection: FoodModel.collection.name,
      count,
      sample,
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
