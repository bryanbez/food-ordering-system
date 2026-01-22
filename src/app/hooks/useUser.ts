import useSWR from "swr";
import useUserIdStore from "../api/store/userId";
import { useRouter } from "next/navigation";
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function useUser(id: string) {
  const { data, error, isLoading } = useSWR(`/api/user/${id}`, fetcher);
  const router = useRouter();

  const logoutUser = () => {
    useUserIdStore.setState({ userId: null });
    fetch("/api/user/logout", { method: "POST" });
    router.push("/login");
  };

  return { user: data || null, error, isLoading, logoutUser };
}
