"use client";
import useSWR from "swr";
import { FoodDocument } from "@/app/types/foodType";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function useFoods() {
  const { data, error, isLoading } = useSWR<FoodDocument[]>(
    "/api/foods",
    fetcher
  );

  return { foods: data || [], error, isLoading };
}
