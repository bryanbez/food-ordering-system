import * as CartRepo from "../repositories/cart.repo";
import type { CartDocument } from "@/app/types/cartTypes";

export async function getAllCartsService(
  userId: string
): Promise<CartDocument[]> {
  const carts = await CartRepo.getAllCartsQuery(userId);
  return carts;
}

export async function addToCartService(
  userId: string,
  foodId: string,
  quantity: number
): Promise<CartDocument> {
  const cart = await CartRepo.addToCartQuery(userId, foodId, quantity);
  return cart;
}

export async function updateCartService(
  userId: string,
  foodId: string,
  quantity: number
): Promise<CartDocument> {
  const cart = await CartRepo.updateCartQuery(userId, foodId, quantity);
  return cart;
}

export async function deleteCartService(
  userId: string,
  foodId: string
): Promise<CartDocument> {
  const cart = await CartRepo.deleteCartQuery(userId, foodId);
  return cart;
}
