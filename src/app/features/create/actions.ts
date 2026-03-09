"use server";

import { redirect } from "next/navigation";
import { createFeature, getNextFeatureId } from "@/db/queries/insert";
import type { InsertFeature } from "@/db/schema";

export async function createFeatureAction(
  _prev: { error?: string } | null,
  formData: FormData,
) {
  const featureName = formData.get("featureName");
  const markdown = formData.get("markdown");

  if (!featureName || !markdown) {
    return { error: "All fields are required." };
  }

  const id = await getNextFeatureId();
  const data: InsertFeature = {
    id,
    featureName: String(featureName).trim(),
    markdown: String(markdown).trim(),
  };

  try {
    await createFeature(data);
  } catch {
    return { error: "Failed to create feature. It may already exist." };
  }

  redirect("/features");
}
