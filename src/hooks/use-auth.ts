import { useEffect } from "react";
import { useAtom } from "jotai";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";

import { authAtom } from "@/stores/auth";
import { URLs } from "@/constants/urls";

const fetchUserData = async () => {
  try {
    const response = await fetch(URLs.INTERNAL.USER.GET);
    if (!response.ok) {
      throw new Error("Falha ao buscar dados do usuário");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw new Error("Não foi possível carregar os dados do usuário");
  }
};

export function useAuth() {
  const [auth, setAuth] = useAtom(authAtom);
  const { data: session, status } = useSession();

  const {
    data: userData,
    error,
    isLoading: isQueryLoading,
  } = useQuery({
    queryKey: ["userData", session?.user?.email],
    queryFn: fetchUserData,
    enabled: status === "authenticated" && !!session?.user?.email,
    staleTime: 10 * 60 * 1000, // 10 minutos
    retry: 2,
  });

  useEffect(() => {
    if (status === "loading") {
      setAuth((prev) => ({ ...prev, isLoading: true }));
      return;
    }

    if (status === "unauthenticated") {
      setAuth({
        isAuthenticated: false,
        isLoading: false,
        user: null,
        error: null,
      });
      return;
    }

    setAuth({
      isAuthenticated: status === "authenticated",
      isLoading: isQueryLoading,
      user: userData ?? null,
      error: error?.message ?? null,
    });
  }, [status, userData, error, setAuth, isQueryLoading]);

  return auth;
}
