import * as CartService from "@/app/lib/db/services/cart.service";
import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/db/config/connection";

type ParamType = {
  params: {
    userId: string;
  };
};

export async function GET(request: Request, { params }: ParamType) {
  try {
    await dbConnect();
    const { userId } = params;
    const cart = await CartService.getAllCartsService(userId);
    return NextResponse.json(`Your Cart: ${cart}`, { status: 200 });
  } catch (error) {
    console.error("Error getting cart:", error);
    return NextResponse.json({ error: "Failed to get cart" }, { status: 500 });
  }
}

export async function POST(request: Request, { params }: ParamType) {
  try {
    await dbConnect();
    const { userId } = params;
    const { foodId, quantity } = await request.json();
    const cart = await CartService.addToCartService(userId, foodId, quantity);
    return NextResponse.json(`Your Cart: ${cart}`, { status: 201 });
  } catch (error) {
    console.error("Error adding to cart:", error);
    return NextResponse.json(
      { error: "Failed to add to cart" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, { params }: ParamType) {
  try {
    await dbConnect();
    const { userId } = params;
    const { foodId, quantity } = await request.json();
    const cart = await CartService.updateCartService(userId, foodId, quantity);
    return NextResponse.json(`Your Cart: ${cart}`, { status: 201 });
  } catch (error) {
    console.error("Error updating cart:", error);
    return NextResponse.json(
      { error: "Failed to update cart" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: ParamType) {
  try {
    await dbConnect();
    const { userId } = params;
    const { foodId } = await request.json();
    const cart = await CartService.deleteCartService(userId, foodId);
    return NextResponse.json(`Your Cart: ${cart}`, { status: 201 });
  } catch (error) {
    console.error("Error deleting cart:", error);
    return NextResponse.json(
      { error: "Failed to delete cart" },
      { status: 500 }
    );
  }
}
