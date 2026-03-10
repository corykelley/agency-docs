"use server";

import { redirect } from "next/navigation";
import { addWebsiteMember, createWebsite } from "@/db/queries/websites";
import type { InsertWebsite } from "@/db/schema";
import { auth } from "@/lib/auth/server";
import slugify from "slugify";

export async function createWebsiteAction(
  _prev: { error?: string } | null,
  formData: FormData,
) {
  const { data: session } = await auth.getSession();

  if (!session?.user) {
    redirect("/auth/sign-in");
  }

  const name = formData.get("name");
  const slug = slugify(String(name).trim(), { lower: true });
  const url = formData.get("url");

  if (!name || !slug || !url) {
    return { error: "All fields are required." };
  }

  const data: InsertWebsite = {
    name: String(name).trim(),
    slug: String(slug).trim(),
    url: String(url).trim(),
  };

  try {
    const [website] = await createWebsite(data);
    if (!website) throw new Error("Create failed");
    await addWebsiteMember({
      websiteId: website.id,
      userId: session.user.id,
      role: "owner",
    });
  } catch {
    return { error: "Failed to create website. It may already exist." };
  }

  redirect(`/sites/${slug}`);
}
