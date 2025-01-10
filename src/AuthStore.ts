import { create } from "zustand";

import { TokenDataType } from "@/data/types";

type State = {
  token: TokenDataType | null;
};

type Actions = {
  setToken: (token: TokenDataType) => void;
  clearToken: () => void;
};

export const useAuthStore = create<State & Actions>((set) => ({
  token:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("token") || "null")
      : null,
  setToken: (token: TokenDataType) => {
    set({ token });
    if (typeof window !== "undefined") {
      localStorage.setItem("token", JSON.stringify(token));
    }
  },

  clearToken: () => {
    set({ token: null });
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
  },
}));
