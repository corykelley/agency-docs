import { notFound } from "next/navigation";
import { getFeatureById } from "@/db/queries/features";
import EditFeatureClient from "./EditFeatureClient";

type EditFeaturePageProps = {
  params: Promise<{ slug: string; id: string }>;
};

export default async function EditFeaturePage({
  params,
}: EditFeaturePageProps) {
  const { slug, id } = await params;
  const rows = await getFeatureById(Number(id));
  const feature = rows[0];

  if (!feature) {
    notFound();
  }

  return <EditFeatureClient feature={feature} siteSlug={slug} />;
}
