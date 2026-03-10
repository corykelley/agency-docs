import { notFound } from "next/navigation";
import FeatureForm from "@/components/FeatureForm";
import { getWebsiteBySlug } from "@/db/queries/websites";

type CreateWebsiteFeaturePageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CreateWebsiteFeaturePage({
  params,
}: CreateWebsiteFeaturePageProps) {
  const { slug } = await params;
  const website = await getWebsiteBySlug(slug);

  if (!website) {
    notFound();
  }

  return (
    <section className="py-12">
      <h1 className="text-2xl font-semibold">
        Create feature for {website.name}
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        This feature will automatically belong to {website.name}.
      </p>

      <div className="mt-8">
        <FeatureForm siteId={website.id} siteSlug={website.slug} />
      </div>
    </section>
  );
}
