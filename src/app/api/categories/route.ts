import { NextResponse } from "next/server";
import { getAllCategoriesService } from "@/app/lib/db/services/category.service";
import dbConnect from "@/app/lib/db/config/connection";

export async function GET() {
  await dbConnect();
  const categories = await getAllCategoriesService();
  return NextResponse.json({ categories });
}
