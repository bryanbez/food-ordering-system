import CategoryModel from "../models/category.model";
import { type CategoryDocument } from "@/app/types/categoryType";

export async function getAllCategoriesQuery(): Promise<CategoryDocument[]> {
  try {
    const categories = await CategoryModel.find();
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}

// export async function getCategoryByIdQuery(id: string) {
//     try {
//         const category = await CategoryModel.findById(id);
//         return category;
//     } catch (error) {
//         console.error("Error fetching category by ID:", error);
//         throw error;
//     }
// }

// export async function createCategoryQuery(categoryData: CategoryDocument) {
//     try {
//         const category = await CategoryModel.create(categoryData);
//         return category;
//     } catch (error) {
//         console.error("Error creating category:", error);
//         throw error;
//     }
// }

// export async function updateCategoryQuery(id: string, categoryData: CategoryDocument) {
//     try {
//         const category = await CategoryModel.findByIdAndUpdate(id, categoryData, { new: true });
//         return category;
//     } catch (error) {
//         console.error("Error updating category:", error);
//         throw error;
//     }
// }

// export async function deleteCategoryQuery(id: string): Promise<CategoryDocument | null> {
//     try {
//         const category = await CategoryModel.findByIdAndDelete(id);
//         return category;
//     } catch (error) {
//         console.error("Error deleting category:", error);
//         throw error;
//     }
// }
