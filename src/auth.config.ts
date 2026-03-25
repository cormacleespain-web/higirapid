import type { NextAuthConfig } from "next-auth";

/**
 * Edge-safe config (no bcrypt). Used by middleware for JWT session checks.
 * Credentials provider lives in `auth.ts` (Node).
 */
export default {
  trustHost: true,
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 8,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.email) {
        session.user = session.user ?? { name: null, email: null, image: null };
        session.user.email = token.email as string;
        if (token.name) session.user.name = token.name as string;
      }
      return session;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
