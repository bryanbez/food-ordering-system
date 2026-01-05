import useSWR from "swr";

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to fetch cart");
    }
    return res.json();
  });

export function useCart(userId: string) {
  const { data, error, isLoading, mutate } = useSWR(
    userId ? `/api/cart/${userId}` : null,
    fetcher
  );

  const addToCart = async (foodId: string, quantity: number) => {
    await fetch(`/api/cart/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ foodId, quantity }),
    });
    mutate();
  };

  const updateCart = async (foodId: string, quantity: number) => {
    await fetch(`/api/cart/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ foodId, quantity }),
    });
    mutate();
  };

  const deleteCart = async (foodId: string) => {
    await fetch(`/api/cart/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ foodId }),
    });
    mutate();
  };

  return {
    cart: data?.cart ?? null,
    error,
    isLoading,
    addToCart,
    updateCart,
    deleteCart,
  };
}
