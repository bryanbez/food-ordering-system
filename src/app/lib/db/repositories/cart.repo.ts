import CartModel from "../models/cart.model";
import type { PopulatedCartDocument } from "@/app/types/cartTypes";
// import logger from "../../logs/logger";

export async function getAllCartsQuery(
  userId: string,
): Promise<PopulatedCartDocument[]> {
  try {
    const carts = await CartModel.aggregate([
      { $match: { userId } },
      { $unwind: "$items" },
      {
        $lookup: {
          from: "foods",
          localField: "items.foodId",
          foreignField: "id",
          as: "food",
        },
      },
      {
        $unwind: "$food",
      },
      {
        $addFields: {
          lineTotal: { $multiply: ["$items.quantity", "$food.price"] },
        },
      },
      {
        $group: {
          _id: "$_id",
          cartId: { $first: "$cartId" },
          userId: { $first: "$userId" },
          createdAt: { $first: "$createdAt" },
          updatedAt: { $first: "$updatedAt" },
          items: {
            $push: {
              foodId: "$items.foodId",
              quantity: "$items.quantity",
              food: "$food",
            },
          },
          totalAmount: { $sum: "$lineTotal" },
        },
      },
      {
        $addFields: {
          subtotal: { $toString: { $round: ["$totalAmount", 2] } },
        },
      },
      {
        $project: {
          totalAmount: 0,
          lineTotal: 0,
        },
      },
    ]);
    return carts;
  } catch (error) {
    console.error("Error fetching carts:", error);
    throw error;
  }
}

export async function addToCartQuery(
  userId: string,
  items: { foodId: string; quantity: number }[],
) {
  try {
    const cart = await CartModel.create({ userId, items });
    return items;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
}

export async function calculateTotalAmountQuery(
  userId: string,
  cartItemIds: string[],
) {
  if (!Array.isArray(cartItemIds) || cartItemIds.length === 0) {
    return { total: 0 };
  }
  const ids = cartItemIds.map(String);

  const result = await CartModel.aggregate([
    { $match: { userId } },
    { $match: { cartId: { $in: ids } } },
    { $unwind: "$items" },
    {
      $lookup: {
        from: "foods",
        localField: "items.foodId",
        foreignField: "id",
        as: "food",
      },
    },
    {
      $unwind: {
        path: "$food",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $group: {
        _id: null,
        total: {
          $sum: {
            $multiply: ["$items.quantity", { $ifNull: ["$food.price", 0] }],
          },
        },
      },
    },
    {
      $project: { _id: 0, total: 1 },
    },
  ]);

  return { total: result[0]?.total ?? 0 };
}

export async function countCartContentQuery(userId: string) {
  const result = await CartModel.aggregate([
    { $match: { userId } },
    {
      $count: "itemCount",
    },
  ]);

  return result[0]?.itemCount ?? 0;
}

export async function updateCartQuery(
  userId: string,
  items: { foodId: string; quantity: number }[],
) {
  try {
    const cart = await CartModel.findOneAndUpdate(
      { userId },
      { items },
      { new: true },
    );
    return cart;
  } catch (error) {
    console.error("Error updating cart:", error);
    throw error;
  }
}

export async function deleteCartQuery(userId: string, cartId: string) {
  try {
    const cart = await CartModel.findOneAndDelete({ cartId, userId });
    return cart;
  } catch (error) {
    console.error("Error deleting cart:", error);
    throw error;
  }
}
