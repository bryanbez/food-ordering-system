import { getAllCategoriesQuery } from "../repositories/category.repo";

export async function getAllCategoriesService() {
  try {
    const categories = await getAllCategoriesQuery();
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}
