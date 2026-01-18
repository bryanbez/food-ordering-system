import * as CartService from "@/app/lib/db/services/cart.service";
import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/db/config/connection";

type ParamType = {
  params: Promise<{
    userId: string;
  }>;
};

export async function GET(request: Request, props: ParamType) {
  try {
    await dbConnect();
    const params = await props.params;
    const { userId } = params;
    const cartcount = await CartService.getAllCartCountService(userId);
    return NextResponse.json({ cartcount }, { status: 200 });
  } catch (error) {
    console.error("Error getting cart count:", error);
    return NextResponse.json(
      { error: "[API] Failed to get cart count" },
      { status: 500 },
    );
  }
}
