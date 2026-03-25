"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { defaultLocale } from "@/i18n/config";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setPending(true);
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (res?.error) {
        setError("Invalid email or password.");
        setPending(false);
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Something went wrong.");
      setPending(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm rounded-lg border border-border bg-surface-primary p-8 shadow-md">
        <h1 className="font-heading text-2xl font-bold italic text-content-primary">HigiRapid</h1>
        <p className="mt-1 text-sm text-content-secondary">Sign in to manage your site content.</p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-content-primary">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="username"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="focus-ring mt-1 w-full rounded-md border border-border bg-surface-primary px-3 py-2 text-content-primary shadow-sm focus:border-primary"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-content-primary">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="focus-ring mt-1 w-full rounded-md border border-border bg-surface-primary px-3 py-2 text-content-primary shadow-sm focus:border-primary"
            />
          </div>
          {error && (
            <p className="text-sm text-error" role="alert">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={pending}
            className="focus-ring w-full rounded-md bg-primary px-4 py-2.5 font-medium text-content-inverse hover:opacity-90 disabled:opacity-50"
          >
            {pending ? "Signing in…" : "Sign in"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-content-secondary">
          <Link href={`/${defaultLocale}`} className="text-primary underline decoration-primary/40 hover:opacity-90">
            Back to website
          </Link>
        </p>
      </div>
    </div>
  );
}
