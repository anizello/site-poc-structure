import { atomWithStorage } from "jotai/utils";

import { UserProps } from "@/types/user";

type AuthState = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: UserProps | null;
  error: string | null;
};

export const authAtom = atomWithStorage<AuthState>("auth", {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  error: null,
});
