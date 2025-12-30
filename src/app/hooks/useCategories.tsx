import useSWR from "swr";
import type { CategoryDocument } from "@/app/types/categoryType";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function useCategories() {
  const { data, error, isLoading } = useSWR<{ categories: CategoryDocument[] }>(
    "/api/categories",
    fetcher
  );

  return { categories: data?.categories || [], error, isLoading };
}
