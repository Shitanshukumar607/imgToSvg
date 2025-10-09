"use client";

import { useAuthStateChange } from "@/hooks/useAuthStateChange";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  useAuthStateChange();
  return <>{children}</>;
};
