"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";
import { useUserStore } from "@/store/userStore";
import Image from "next/image";
import type { Provider } from "@supabase/supabase-js";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const { setUser, setLoading, setError, isLoading, error } = useUserStore();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword(
        {
          email,
          password,
        },
      );

      if (authError) throw authError;

      if (data.user) {
        setUser({
          id: data.user.id,
          email: data.user.email!,
          name:
            data.user.user_metadata?.name || data.user.user_metadata?.full_name,
          avatar_url: data.user.user_metadata?.avatar_url,
          provider: "email",
          created_at: data.user.created_at,
          updated_at: data.user.updated_at || data.user.created_at,
        });
      }

      router.push("/");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthLogin = async (provider: Provider) => {
    setLoading(true);
    setError(null);

    try {
      const { error: authError } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (authError) throw authError;
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-zinc-50 dark:bg-neutral-900/80 flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="hidden sm:block absolute top-10 left-10 h-16 w-16 border-t-2 border-l-2 border-emerald-400 dark:border-violet-500 opacity-60 rounded-tl-lg" />
      <div className="hidden sm:block absolute bottom-10 right-10 h-20 w-20 border-b-2 border-r-2 border-emerald-400 dark:border-violet-500 opacity-60 rounded-br-lg" />

      <div className="absolute top-1/3 -left-6 w-24 h-24 border border-emerald-300 dark:border-violet-400/40 rounded-full opacity-30" />
      <div className="absolute bottom-1/4 -right-8 w-20 h-20 border border-emerald-300 dark:border-violet-400/40 rotate-12 opacity-30" />

      <div className="w-full max-w-sm relative z-10">
        <div className="flex flex-col gap-6">
          <Card className="border-emerald-200/50 dark:border-violet-500/30 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-xl text-slate-900 dark:text-neutral-100">
                Welcome back
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-neutral-400">
                Login with your GitHub or Google account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin}>
                <FieldGroup>
                  <Field>
                    <Button
                      onClick={() => handleOAuthLogin("github")}
                      variant="outline"
                      type="button"
                      className="border-emerald-200 text-slate-700 hover:bg-emerald-50 hover:border-emerald-300 dark:border-violet-400/40 dark:text-neutral-300 dark:hover:bg-violet-500/10 dark:hover:border-violet-400"
                      disabled={isLoading}
                    >
                      <Image
                        width="24"
                        height="24"
                        src="https://img.icons8.com/material-outlined/24/github.png"
                        alt="github"
                      />
                      Login with GitHub
                    </Button>
                    <Button
                      onClick={() => handleOAuthLogin("google")}
                      variant="outline"
                      type="button"
                      className="border-emerald-200 text-slate-700 hover:bg-emerald-50 hover:border-emerald-300 dark:border-violet-400/40 dark:text-neutral-300 dark:hover:bg-violet-500/10 dark:hover:border-violet-400"
                      disabled={isLoading}
                    >
                      <GoogleIcon className="size-8" />
                      Login with Google
                    </Button>
                  </Field>
                  <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                    Or continue with
                  </FieldSeparator>
                  <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoading}
                    />
                  </Field>
                  <Field>
                    <div className="flex items-center">
                      <FieldLabel htmlFor="password">Password</FieldLabel>
                      <Link
                        href="/forgot-password"
                        className="ml-auto text-sm underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isLoading}
                    />
                  </Field>
                  {error && <p className="text-sm text-red-500">{error}</p>}
                  <Field>
                    <Button
                      type="submit"
                      className="w-full bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-violet-600 dark:hover:bg-violet-700 transition-colors"
                      disabled={isLoading}
                    >
                      {isLoading ? "Logging in..." : "Login"}
                    </Button>
                    <FieldDescription className="text-center">
                      Don&apos;t have an account?{" "}
                      <Link href="/signup">Sign up</Link>
                    </FieldDescription>
                  </Field>
                </FieldGroup>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

const GoogleIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    width="28"
    height="28"
    viewBox="0 0 48 48"
    className={className}
  >
    <path
      fill="#FFC107"
      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
    ></path>
    <path
      fill="#FF3D00"
      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
    ></path>
    <path
      fill="#4CAF50"
      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
    ></path>
    <path
      fill="#1976D2"
      d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
    ></path>
  </svg>
);

export default Login;
