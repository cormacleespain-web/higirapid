import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin-session";

export async function POST(request: Request) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    return NextResponse.json(
      { error: "BLOB_READ_WRITE_TOKEN is not set. Add Vercel Blob to the project." },
      { status: 503 }
    );
  }

  const formData = await request.formData();
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "Missing file" }, { status: 400 });
  }

  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json({ error: "File too large (max 5MB)" }, { status: 400 });
  }

  try {
    const blob = await put(file.name.replace(/[^\w.\-]/g, "_"), file, {
      access: "public",
      token,
    });
    return NextResponse.json({ url: blob.url });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
