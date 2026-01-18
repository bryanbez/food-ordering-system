export type CartDocument = {
  cartId: string;
  userId: string;
  items: Array<{ foodId: string; quantity: number }>;
  createdAt: Date;
  updatedAt: Date;
};

import { FoodDocument } from "./foodType";

export interface PopulatedCartItem {
  foodId: string;
  quantity: number;
  food: FoodDocument;
}

export interface PopulatedCartDocument {
  cartId: string;
  userId: string;
  items: PopulatedCartItem[];
  createdAt: Date;
  updatedAt: Date;
  subtotal: string;
}
