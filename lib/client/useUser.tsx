import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";

export default function useUser() {
  const router = useRouter();
  const { data, error, isValidating } = useSWR("/api/profile");
  useEffect(() => {
    if (error) {
      router.replace("/login");
    }
  }, [error]);

  return [data, isValidating];
}
