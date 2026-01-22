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
    const cart = await CartService.getAllCartsService(userId);
    return NextResponse.json({ cart }, { status: 200 });
  } catch (error) {
    console.error("Error getting cart:", error);
    return NextResponse.json(
      { error: "[API] Failed to get cart" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request, props: ParamType) {
  try {
    await dbConnect();
    const params = await props.params;
    const { userId } = params;
    const { cartId, item } = await request.json();

    console.log("[API] Saving to cart (POST):", { userId, cartId, item });

    const cart = await CartService.saveToCartService(userId, [item], cartId);

    return NextResponse.json({ cart }, { status: 201 });
  } catch (error) {
    console.error("Error adding cart:", error);
    return NextResponse.json(
      { error: `[API] Failed to add cart` },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request, props: ParamType) {
  try {
    await dbConnect();
    const params = await props.params;
    const { userId } = params;
    const { cartId, item } = await request.json();

    console.log("[API] Saving to cart (PUT):", { userId, cartId, item });

    const cart = await CartService.saveToCartService(userId, [item], cartId);

    return NextResponse.json(
      { message: "Cart saved successfully", cart },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error updating cart:", error);
    return NextResponse.json(
      { error: "[API] Failed to update cart" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request, props: ParamType) {
  try {
    await dbConnect();
    const params = await props.params;
    const { userId } = params;
    const { cartId } = await request.json();
    const cart = await CartService.deleteCartService(userId, cartId);
    return NextResponse.json(
      { message: "Cart deleted successfully", cart },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting cart:", error);
    return NextResponse.json(
      { error: "[API] Failed to delete cart" },
      { status: 500 },
    );
  }
}
