"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useUserStore } from "@/store/userStore";

const AuthCallback = () => {
  const router = useRouter();
  const { setUser, setError } = useUserStore();
  const supabase = createClient();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();

        if (error) throw error;

        if (data.session?.user) {
          const user = data.session.user;
          setUser({
            id: user.id,
            email: user.email!,
            name: user.user_metadata?.name || user.user_metadata?.full_name,
            avatar_url: user.user_metadata?.avatar_url,
            provider: user.app_metadata?.provider || "oauth",
            created_at: user.created_at,
            updated_at: user.updated_at || user.created_at,
          });
        }

        router.push("/");
      } catch (error: unknown) {
        setError(
          error instanceof Error ? error.message : "Authentication failed",
        );
        router.push("/login");
      }
    };

    handleAuthCallback();
  }, [router, setUser, setError, supabase.auth]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="mt-4 text-slate-600 dark:text-neutral-400">
        Completing authentication...
      </p>
    </div>
  );
};

export default AuthCallback;
