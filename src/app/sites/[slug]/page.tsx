import { notFound } from "next/navigation";
import { getWebsiteWithFeaturesBySlug } from "@/db/queries/websites";

import WebsiteClient from "./WebsiteClient";

type WebsitePageProps = {
  params: Promise<{ slug: string }>;
};

export default async function WebsitePage({ params }: WebsitePageProps) {
  const { slug } = await params;
  const website = await getWebsiteWithFeaturesBySlug(slug);

  if (!website) {
    notFound();
  }

  return <WebsiteClient website={website} />;
}
