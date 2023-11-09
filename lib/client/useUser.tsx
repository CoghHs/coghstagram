import { User } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";

interface ProfileResponse {
  ok: boolean;
  profile: User;
}

export default function useUser() {
  const router = useRouter();
  const { data, error } = useSWR<ProfileResponse>("/api/profile");
  useEffect(() => {
    if (error) {
      router.replace("/login");
    }
  }, [error]);

  return { user: data?.profile, isLoading: !data && !error };
}
