import CartModel from "../models/cart.model";
import type { CartDocument } from "@/app/types/cartTypes";

export async function getAllCartsQuery(
  userId: string
): Promise<CartDocument[]> {
  try {
    const carts = await CartModel.find({ userId });
    return carts;
  } catch (error) {
    console.error("Error fetching carts:", error);
    throw error;
  }
}

export async function addToCartQuery(
  userId: string,
  foodId: string,
  quantity: number
) {
  try {
    const cart = await CartModel.create({ userId, foodId, quantity });
    return cart;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
}

export async function updateCartQuery(
  userId: string,
  foodId: string,
  quantity: number
) {
  try {
    const cart = await CartModel.findOneAndUpdate(
      { userId, foodId },
      { quantity },
      { new: true }
    );
    return cart;
  } catch (error) {
    console.error("Error updating cart:", error);
    throw error;
  }
}

export async function deleteCartQuery(userId: string, foodId: string) {
  try {
    const cart = await CartModel.findOneAndDelete({ userId, foodId });
    return cart;
  } catch (error) {
    console.error("Error deleting cart:", error);
    throw error;
  }
}
