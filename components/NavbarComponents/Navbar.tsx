"use client";

import { Home, ImageUp } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import AuthButtons from "./AuthButtons";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { name: "Home", href: "/", icon: Home },
    { name: "Generate", href: "/generate", icon: ImageUp },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-neutral-700 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm">
      <div className="flex h-16 items-center px-4 sm:px-6">
        <div className="flex-shrink-0">
          <Link
            href="/"
            className="text-lg font-bold text-slate-800 dark:text-neutral-100"
          >
            SVG{" "}
            <span className="text-emerald-600 dark:text-violet-500">From</span>{" "}
            Img
          </Link>
        </div>

        <div className="hidden md:flex items-center justify-center flex-1">
          <div className="flex space-x-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex h-10 items-center px-3 py-2 text-sm font-medium rounded-md
                    ${
                      pathname === link.href
                        ? "bg-emerald-100 text-emerald-700 dark:bg-violet-700/30 dark:text-violet-300"
                        : "text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 dark:text-neutral-400 dark:hover:text-violet-400 dark:hover:bg-violet-700/20"
                    }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-2 ml-auto gap-3">
          <ThemeToggle />
          <AuthButtons />
        </div>
      </div>
    </nav>
  );
}
