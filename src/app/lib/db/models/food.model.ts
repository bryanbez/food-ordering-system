import { Schema, model, models } from "mongoose";
import type { FoodDocument } from "@/app/types/foodType";

// Prevent Mongoose OverwriteModelError by deleting the model if it exists
// This is necessary because we changed the schema but the server wasn't restarted
if (models.Food) {
  delete models.Food;
}

const FoodSchema = new Schema<FoodDocument>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: false },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: String, required: false },
    isAvailable: { type: Boolean, required: true },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
  },
  {
    collection: "foods",
    timestamps: true,
  }
);

const FoodModel = models.Food || model<FoodDocument>("Food", FoodSchema);

export default FoodModel;
