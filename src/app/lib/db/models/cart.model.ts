import { Schema, model, models } from "mongoose";
import type { CartDocument } from "@/app/types/cartTypes";
import { v4 as uuidv4 } from "uuid";

const CartSchema = new Schema<CartDocument>(
  {
    cartId: {
      type: String,
      default: () => uuidv4(),
      unique: true,
      index: true,
    },
    userId: { type: String, required: true },
    items: [{ foodId: String, quantity: Number }],
    createdAt: { type: Date },
    updatedAt: { type: Date },
  },
  {
    collection: "carts",
    timestamps: true,
  }
);

const CartModel = models.Cart || model<CartDocument>("Cart", CartSchema);

// Temporary fix: Drop the 'id_1' index if it exists, as it causes duplicate key errors
// because the 'id' field is not present in the current schema.
CartModel.collection.dropIndex("id_1").catch((err) => {
  if (err.code !== 27) {
    // 27 is 'IndexNotFound'
    console.warn("Failed to drop index 'id_1':", err.message);
  }
});

export default CartModel;
