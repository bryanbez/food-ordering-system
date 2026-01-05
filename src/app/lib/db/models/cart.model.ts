import { Schema, model, models } from "mongoose";
import type { CartDocument } from "@/app/types/cartTypes";

const CartSchema = new Schema<CartDocument>(
  {
    id: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    foodId: { type: String, required: true },
    quantity: { type: Number, required: true },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
  },
  {
    collection: "carts",
    timestamps: true,
  }
);

const CartModel = models.Cart || model<CartDocument>("Cart", CartSchema);

export default CartModel;
