"use server";

import { redirect } from "next/navigation";
import { editFeature } from "@/db/queries/features";
import { auth } from "@/lib/auth/server";

export async function editFeatureAction(
  _prev: { error?: string } | null,
  formData: FormData,
) {
  const { data: session } = await auth.getSession();

  if (!session?.user) {
    redirect("/auth/sign-in");
  }

  const featureId = Number(formData.get("featureId"));
  const siteSlug = formData.get("siteSlug");
  const title = formData.get("title");
  const markdown = formData.get("markdown");

  if (
    !Number.isInteger(featureId) ||
    featureId < 1 ||
    !siteSlug ||
    !title ||
    !markdown
  ) {
    return { error: "All fields are required." };
  }

  try {
    await editFeature(featureId, {
      title: String(title).trim(),
      markdown: String(markdown).trim(),
    });
  } catch {
    return { error: "Failed to update feature." };
  }

  redirect(`/sites/${siteSlug}`);
}
