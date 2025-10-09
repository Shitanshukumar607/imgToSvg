import type { UserActions, UserState } from "@/types/user";
import { create } from "zustand";

type UserStore = UserState & UserActions;

export const useUserStore = create<UserStore>()((set, get) => ({
  user: null,
  isLoading: false,
  error: null,

  setUser: (user) => set({ user, error: null }, false),

  setLoading: (isLoading) => set({ isLoading }, false),

  setError: (error) => set({ error, isLoading: false }, false),

  clearUser: () => set({ user: null, error: null, isLoading: false }, false),

  updateUser: (updates) => {
    const currentUser = get().user;
    if (currentUser) {
      set({ user: { ...currentUser, ...updates } }, false);
    }
  },
}));

export const useUser = () => useUserStore((state) => state.user);
export const useUserLoading = () => useUserStore((state) => state.isLoading);
export const useUserError = () => useUserStore((state) => state.error);
