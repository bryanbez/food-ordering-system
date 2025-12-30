import type { FoodDocument } from "@/app/types/foodType";
import type { CategoryDocument } from "@/app/types/categoryType";

export function checkFoodCategoryHasItem(
  foods: FoodDocument[],
  categories: CategoryDocument[]
) {
  const categorySet = new Set(foods.map((food) => food.category));

  return categories.filter((category) => categorySet.has(category.sku));
}
