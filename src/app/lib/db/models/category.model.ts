import mongoose, { ObjectId } from "mongoose";

export interface CategoryDocument {
  _id: ObjectId;
  name: string;
  description?: string;
}

const categorySchema = new mongoose.Schema<CategoryDocument>({
  name: { type: String, required: true },
  description: { type: String, required: false },
});

const CategoryQuery = mongoose.model<CategoryDocument>(
  "Category",
  categorySchema
);

export default CategoryQuery;
