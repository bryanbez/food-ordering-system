import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/db/config/connection";
import FoodModel from "@/app/lib/db/models/food.model";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    await dbConnect();

    const filePath = path.join(process.cwd(), "public", "foods.json");
    const fileContents = fs.readFileSync(filePath, "utf8");
    const foods = JSON.parse(fileContents);

    if (!foods || !Array.isArray(foods)) {
      return NextResponse.json(
        { error: "Invalid foods format" },
        { status: 400 }
      );
    }

    const results = [];
    for (const food of foods) {
      // Ensure we use the string ID from the JSON
      const result = await FoodModel.findOneAndUpdate(
        { id: food.id },
        {
          name: food.name,
          description: food.description,
          price: food.price,
          image: food.image,
          category: food.category,
          // Default isAvailable to true if not present, though model says required.
          // The migration script didn't add isAvailable, but foods.json usually has it or we can default.
          // Looking at previous foods.json view, it didn't seem to have isAvailable in all entries?
          // Let's check the view_file output again.
          // The user's pasted foods.json did NOT have isAvailable in the items.
          // The FoodModel says isAvailable is required.
          // I should add a default value here.
          isAvailable: food.isAvailable ?? true,
        },
        { upsert: true, new: true }
      );
      results.push(result);
    }

    return NextResponse.json({
      message: "Foods seeded successfully",
      count: results.length,
      data: results,
    });
  } catch (error: unknown) {
    console.error("Seeding error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
