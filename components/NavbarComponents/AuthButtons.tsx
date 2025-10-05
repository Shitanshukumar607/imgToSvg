"use client";

import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useEffect, useState } from "react";

const AuthButtons = () => {
  const supabase = createClient();
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();

      setUser(
        data?.user?.user_metadata?.name || data?.user?.email?.split("@")[0],
      );
      setLoading(false);
    };
    fetchUser();
  }, [supabase.auth]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) setUser(null);
    else throw error;
  };

  return (
    <div>
      {user ? (
        <button
          onClick={handleLogout}
          className="hidden sm:flex text-xs border border-emerald-500 dark:border-purple-500 px-3 py-1.5 rounded-md hover:bg-emerald-100 dark:hover:bg-violet-900 transition-colors duration-200 items-center gap-1.5"
        >
          <span>Logout</span>
          {!loading && (
            <span className="text-xs opacity-70">{`(${user})`}</span>
          )}
        </button>
      ) : (
        <Link
          href="/login"
          className="text-sm border border-emerald-500 dark:border-purple-500 px-4 py-2 rounded-md hover:bg-emerald-100 dark:hover:bg-violet-900 transition-colors duration-200"
        >
          Login
        </Link>
      )}
    </div>
  );
};

export default AuthButtons;
