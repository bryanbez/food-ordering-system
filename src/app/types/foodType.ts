import { ObjectId } from "mongoose";

export interface FoodDocument {
  _id: ObjectId;
  id: string;
  name: string;
  description?: string;
  price: number;
  image: string;
  category?: string;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}
