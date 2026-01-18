import useSWR from "swr";
import { useCallback, useState, useMemo } from "react";
import useUserIdStore from "../api/store/userId";
import { CartDocument } from "../types/cartTypes";

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to fetch cart");
    }
    return res.json();
  });

export function useCart() {
  const userId = useUserIdStore((state) => state.userId);
  const [manualSelection, setManualSelection] = useState<Set<string> | null>(
    null,
  );

  if (!userId) {
    throw new Error("User ID not found");
  }
  // Main cart data
  const { data, error, isLoading, mutate } = useSWR<{ cart: CartDocument[] }>(
    userId ? `/api/cart/${userId}` : null,
    fetcher,
  );

  // Cart count data
  const { data: countData, mutate: mutateCount } = useSWR(
    userId ? `/api/cart/${userId}/cartcount` : null,
    fetcher,
  );

  // Derive the active selection: either manual or "all items" by default
  // We filter manualSelection to ensure it only reflects items currently in the cart
  const selectedCartIds = useMemo(() => {
    const cartIds = data?.cart?.map((item: CartDocument) => item.cartId) ?? [];
    const currentCartIds = new Set<string>(cartIds);

    if (manualSelection === null) {
      return currentCartIds;
    }

    const filtered = new Set<string>();
    manualSelection.forEach((id) => {
      if (currentCartIds.has(id)) {
        filtered.add(id);
      }
    });
    return filtered;
  }, [manualSelection, data?.cart]);

  // Wrapper for setSelectedCartIds to maintain compatibility
  const setSelectedCartIds = useCallback(
    (next: Set<string> | ((prev: Set<string>) => Set<string>)) => {
      setManualSelection((prev) => {
        const current = prev ?? selectedCartIds;
        return typeof next === "function" ? next(current) : next;
      });
    },
    [selectedCartIds],
  );

  const calculateTotalAmount = useCallback(
    async (cartItemIds: string[]) => {
      const response = await fetch(`/api/cart/${userId}/total`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, cartItemIds }),
      });
      const data = await response.json();
      return data.total;
    },
    [userId],
  );

  const addToCart = async (foodId: string, quantity: number) => {
    if (!userId) {
      throw new Error("User ID not found");
    }
    await fetch(`/api/cart/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, foodId, quantity }),
    });
    mutate();
    mutateCount();
  };

  const updateCart = async (foodId: string, quantity: number) => {
    if (!userId) {
      throw new Error("User ID not found");
    }
    await fetch(`/api/cart/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, foodId, quantity }),
    });
    mutate();
    mutateCount();
  };

  const deleteCart = async (cartId: string) => {
    if (!userId) {
      throw new Error("User ID not found");
    }
    await fetch(`/api/cart/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, cartId }),
    });
    mutate();
    mutateCount();
  };

  return {
    cart: data?.cart ?? null,
    cartCount: countData?.cartcount ?? 0,
    selectedCartIds: selectedCartIds as Set<string>,
    setSelectedCartIds,
    error,
    isLoading,
    addToCart,
    updateCart,
    deleteCart,
    calculateTotalAmount,
  };
}
