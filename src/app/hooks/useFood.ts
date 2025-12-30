import useSWR from "swr";
import type { FoodDocument } from "@/app/types/foodType";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function useFood(id: string) {
  const { data, error, isLoading } = useSWR<FoodDocument>(
    `/api/food/${id}`,
    fetcher
  );

  return { food: data || null, error, isLoading };
}
