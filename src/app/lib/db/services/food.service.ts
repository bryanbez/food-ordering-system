import * as foodRepo from "../repositories/food.repo";
import type { FoodDocument } from "@/app/types/foodType";

export async function getAllFoodsService() {
  try {
    const foods = await foodRepo.getAllFoodsQuery();
    return foods;
  } catch (error) {
    console.error("Error fetching foods:", error);
    throw error;
  }
}

export async function getFoodByIdService(id: string) {
  try {
    const food = await foodRepo.getFoodByIdQuery(id);
    return food;
  } catch (error) {
    console.error("Error fetching food by ID:", error);
    throw error;
  }
}

export async function createFoodService(foodData: FoodDocument) {
  try {
    const savedFood = await foodRepo.createFoodQuery(foodData);
    return savedFood;
  } catch (error) {
    console.error("Error creating food:", error);
    throw error;
  }
}

export async function updateFoodService(id: string, foodData: FoodDocument) {
  try {
    const updatedFood = await foodRepo.updateFoodQuery(id, foodData);
    return updatedFood;
  } catch (error) {
    console.error("Error updating food:", error);
    throw error;
  }
}

export async function deleteFoodService(id: string) {
  try {
    const deletedFood = await foodRepo.deleteFoodQuery(id);
    return deletedFood;
  } catch (error) {
    console.error("Error deleting food:", error);
    throw error;
  }
}
