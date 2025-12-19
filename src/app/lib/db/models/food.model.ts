import { Schema, model, models, ObjectId } from "mongoose";

export interface FoodDocument {
  _id: ObjectId;
  name: string;
  description?: string;
  price: number;
  image: string;
  category?: string;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const FoodSchema = new Schema<FoodDocument>(
  {
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
