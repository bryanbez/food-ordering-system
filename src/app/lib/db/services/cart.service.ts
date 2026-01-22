import * as CartRepo from "../repositories/cart.repo";
import * as FoodRepo from "../repositories/food.repo";
import { Types } from "mongoose";
import type { PopulatedCartDocument } from "@/app/types/cartTypes";

export async function getAllCartsService(
  userId: string,
): Promise<PopulatedCartDocument[]> {
  const carts = await CartRepo.getAllCartsQuery(userId);
  return carts;
}

export type CartItem = { foodId: string; quantity: number };

export async function saveToCartService(
  userId: string,
  items: CartItem[],
  cartId?: string,
): Promise<CartItem> {
  const result = await CartRepo.saveCartItemQuery(userId, items, cartId);
  return result;
}

export async function calculateTotalAmountService(
  userId: string,
  cartItemIds: string[],
): Promise<{ total: string }> {
  const calculateTotalAmount = await CartRepo.calculateTotalAmountQuery(
    userId,
    cartItemIds,
  );
  return calculateTotalAmount;
}

export async function getAllCartCountService(userId: string) {
  const countCartContent = await CartRepo.countCartContentQuery(userId);
  return countCartContent;
}

export async function deleteCartService(
  userId: string,
  cartId: string,
): Promise<{ cartId: string }> {
  const cart = await CartRepo.deleteCartQuery(userId, cartId);
  return cart;
}
