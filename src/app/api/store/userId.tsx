import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserIdState {
  userId: string | null;
  setUserId: (userId: string) => void;
}

const useUserIdStore = create<UserIdState>()(
  persist(
    (set) => ({
      userId: null,
      setUserId: (userId: string) => set({ userId }),
    }),
    {
      name: "user-id-storage",
    }
  )
);

export default useUserIdStore;
