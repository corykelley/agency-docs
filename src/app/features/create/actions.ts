"use server";

import { redirect } from "next/navigation";
import { createFeature } from "@/db/queries/features";
import type { InsertFeature } from "@/db/schema";
import { auth } from "@/lib/auth/server";

export async function createFeatureAction(
  _prev: { error?: string } | null,
  formData: FormData,
) {
  const { data: session } = await auth.getSession();

  if (!session?.user) {
    redirect("/auth/sign-in");
  }

  const title = formData.get("title");
  const markdown = formData.get("markdown");

  if (!title || !markdown) {
    return { error: "All fields are required." };
  }

  const data: InsertFeature = {
    title: String(title).trim(),
    markdown: String(markdown).trim(),
  };

  try {
    await createFeature(data);
  } catch {
    return { error: "Failed to create feature. It may already exist." };
  }

  redirect("/features");
}
