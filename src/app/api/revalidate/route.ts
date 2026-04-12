import { NextResponse } from "next/server";
import { revalidateAllLocales } from "@/lib/revalidate-public";

/**
 * On-demand cache invalidation for the public site (e.g. CI or preview editing against prod DB).
 * Requires `CMS_REVALIDATE_SECRET` and `Authorization: Bearer <secret>`.
 */
export async function POST(request: Request) {
  const secret = process.env.CMS_REVALIDATE_SECRET?.trim();
  if (!secret) {
    return NextResponse.json({ ok: false, error: "Not configured" }, { status: 503 });
  }

  const auth = request.headers.get("authorization");
  const token = auth?.startsWith("Bearer ") ? auth.slice(7).trim() : null;
  if (!token || token !== secret) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  try {
    revalidateAllLocales();
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
