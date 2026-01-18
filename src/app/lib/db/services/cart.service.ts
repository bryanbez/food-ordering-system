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

export async function addToCartService(
  userId: string,
  items: { foodId: string; quantity: number }[],
): Promise<{ foodId: string; quantity: number }[]> {
  const cart = await CartRepo.addToCartQuery(userId, items);
  return cart;
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

export async function updateCartService(
  userId: string,
  items: { foodId: string; quantity: number }[],
): Promise<{ foodId: string; quantity: number }[]> {
  const cart = await CartRepo.updateCartQuery(userId, items);
  return cart;
}

export async function deleteCartService(
  userId: string,
  cartId: string,
): Promise<{ cartId: string }> {
  const cart = await CartRepo.deleteCartQuery(userId, cartId);
  return cart;
}
