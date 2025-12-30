"use client";

import useFood from "@/app/hooks/useFood";
import DisplaySpecificFood from "@/components/Foods/DisplaySpecificFood";
import { useParams } from "next/navigation";

export default function FoodDescriptionPage() {
  const { id } = useParams();
  const { food, error, isLoading } = useFood(id as string);

  console.log(food);

  return (
    <DisplaySpecificFood food={food} error={error} isLoading={isLoading} />
  );
}
