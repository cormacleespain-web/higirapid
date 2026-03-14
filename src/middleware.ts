import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Run on all pathnames except api, _next, _vercel, and paths with a dot (static assets).
  // Ensures next-intl always sets locale so language-by-URL never hits "middleware didn't run" errors.
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
