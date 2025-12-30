import { Schema, model, models } from "mongoose";
import type { CategoryDocument } from "@/app/types/categoryType";

const CategorySchema = new Schema<CategoryDocument>(
  {
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    image: { type: String, default: "" },
    sku: { type: String, required: true },
    isAvailable: { type: Boolean, required: true, default: true },
  },
  {
    collection: "categories",
    timestamps: true,
  }
);

const CategoryModel =
  models.Category || model<CategoryDocument>("Category", CategorySchema);

export default CategoryModel;
