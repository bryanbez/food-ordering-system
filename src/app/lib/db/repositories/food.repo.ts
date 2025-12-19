import FoodModel from "../models/food.model";
import { type FoodDocument } from "../models/food.model";

export async function getAllFoodsQuery() {
  try {
    // await dbConnect(); we move that on api file to reduce the reduncancy of calling that.
    const foods = await FoodModel.find();
    return foods;
  } catch (error) {
    console.error("Error fetching foods:", error);
    throw error;
  }
}

export async function getFoodByIdQuery(id: string) {
  try {
    const food = await FoodModel.findById(id);
    return food;
  } catch (error) {
    console.error("Error fetching food by ID:", error);
    throw error;
  }
}

export async function createFoodQuery(foodData: FoodDocument) {
  try {
    const food = await FoodModel.create(foodData);
    return food;
  } catch (error) {
    console.error("Error creating food:", error);
    throw error;
  }
}

export async function updateFoodQuery(id: string, foodData: FoodDocument) {
  try {
    const food = await FoodModel.findByIdAndUpdate(id, foodData, { new: true });
    return food;
  } catch (error) {
    console.error("Error updating food:", error);
    throw error;
  }
}

export async function deleteFoodQuery(
  id: string
): Promise<FoodDocument | null> {
  try {
    const food = await FoodModel.findByIdAndDelete(id);
    return food;
  } catch (error) {
    console.error("Error deleting food:", error);
    throw error;
  }
}
