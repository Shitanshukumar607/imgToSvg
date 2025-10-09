"use client";

import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useUserStore } from "@/store/userStore";

export const useAuthStateChange = () => {
  const { setUser, clearUser } = useUserStore();
  const supabase = createClient();

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        const user = session.user;
        setUser({
          id: user.id,
          email: user.email!,
          name: user.user_metadata?.name || user.user_metadata?.full_name,
          avatar_url: user.user_metadata?.avatar_url,
          provider: user.app_metadata?.provider || "email",
          created_at: user.created_at,
          updated_at: user.updated_at || user.created_at,
        });
      }
    };

    getInitialSession();

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        const user = session.user;
        setUser({
          id: user.id,
          email: user.email!,
          name: user.user_metadata?.name || user.user_metadata?.full_name,
          avatar_url: user.user_metadata?.avatar_url,
          provider: user.app_metadata?.provider || "email",
          created_at: user.created_at,
          updated_at: user.updated_at || user.created_at,
        });
      } else if (event === "SIGNED_OUT") {
        clearUser();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [setUser, clearUser, supabase.auth]);
};
