import * as CartService from "@/app/lib/db/services/cart.service";
import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/db/config/connection";

type ParamType = {
  params: Promise<{
    userId: string;
  }>;
};

export async function POST(request: Request, props: ParamType) {
  try {
    await dbConnect();
    const params = await props.params;
    const { userId } = params;
    const body = await request.json();
    const cartItemIds: string[] = Array.isArray(body.cartItemIds)
      ? body.cartItemIds.map(String)
      : [];

    if (process.env.NODE_ENV !== "production") {
      console.info("Calculating cart total", { userId, cartItemIds });
    }

    const total = await CartService.calculateTotalAmountService(
      userId,
      cartItemIds,
    );
    return NextResponse.json(total, { status: 200 });
  } catch (error) {
    console.error("Error calculating total:", error);
    return NextResponse.json(
      { message: "Failed to calculate total" },
      { status: 500 },
    );
  }
}
