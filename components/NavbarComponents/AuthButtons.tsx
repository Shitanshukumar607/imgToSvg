"use client";

import { createClient } from "@/lib/supabase/client";
import { useUser, useUserStore } from "@/store/userStore";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AuthButtons = () => {
  const user = useUser();
  const { clearUser } = useUserStore();
  const supabase = createClient();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      clearUser();
      router.push("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div>
      {user ? (
        <button
          onClick={handleLogout}
          className="hidden sm:flex text-xs border border-emerald-500 dark:border-purple-500 px-3 py-1.5 rounded-md hover:bg-emerald-100 dark:hover:bg-violet-900 transition-colors duration-200 items-center gap-1.5"
        >
          <span>Logout</span>
          <span className="text-xs opacity-70">{`(${user.email.split("@")[0]})`}</span>
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
