"use client";

import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="z-50 bg-white dark:bg-neutral-900 border-t border-slate-200 dark:border-neutral-800 text-center w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-6">
      <p className="text-xs text-slate-500 dark:text-slate-400">
        © {currentYear} SVG From Img. All rights reserved. | Made with ❤️ by{" "}
        <Link className="underline" href="https://github.com/ShitanshuKumar607">
          Shitanshu Kumar
        </Link>
      </p>
    </footer>
  );
};

export default Footer;
