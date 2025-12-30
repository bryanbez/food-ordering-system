import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/db/config/connection";
import CategoryModel from "@/app/lib/db/models/category.model";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    await dbConnect();

    const filePath = path.join(process.cwd(), "public", "categories.json");
    const fileContents = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(fileContents);
    const categories = data.categories;

    if (!categories || !Array.isArray(categories)) {
      return NextResponse.json(
        { error: "Invalid categories format" },
        { status: 400 }
      );
    }

    // Clear existing categories (optional, dependent on requirement, assuming clean seed for now)
    // await CategoryModel.deleteMany({});
    // Actually, let's use upsert to preserve existing data or update it.

    const results = [];
    for (const cat of categories) {
      const result = await CategoryModel.findOneAndUpdate(
        { id: cat.id },
        {
          name: cat.name,
          image: cat.image,
          sku: cat.sku,
          isAvailable: cat.isAvailable,
        },
        { upsert: true, new: true }
      );
      results.push(result);
    }

    return NextResponse.json({
      message: "Categories seeded successfully",
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
