import Link from "next/link";

const AuthButtons = () => {
  const user = true;
  return (
    <div>
      {user ? (
        <button className="hidden sm:flex text-xs border border-emerald-500 dark:border-purple-500 px-3 py-1.5 rounded-md hover:bg-emerald-100 dark:hover:bg-violet-900 transition-colors duration-200 items-center gap-1.5">
          <span>Logout</span>
          <span className="text-xs opacity-70">(Name)</span>
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
