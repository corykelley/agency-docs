import Link from "next/link";
import { notFound } from "next/navigation";
import { getWebsiteWithFeaturesBySlug } from "@/db/queries/websites";

type WebsitePageProps = {
  params: Promise<{ slug: string }>;
};

export default async function WebsitePage({ params }: WebsitePageProps) {
  const { slug } = await params;
  const website = await getWebsiteWithFeaturesBySlug(slug);

  if (!website) {
    notFound();
  }

  return (
    <section className="py-12">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold">{website.name}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{website.url}</p>
        </div>

        <Link
          href={`/sites/${website.slug}/features/create`}
          className="rounded bg-gray-900 px-4 py-2 text-sm font-medium text-white"
        >
          Create feature
        </Link>
      </div>

      <section className="mt-10 flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Features</h2>

        {website.features.length === 0 ? (
          <p className="text-sm text-muted-foreground">No features yet.</p>
        ) : (
          website.features.map((feature) => (
            <article key={feature.id} className="rounded border p-4">
              <h3 className="font-medium">{feature.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {feature.createdAt.toLocaleDateString()}
              </p>
            </article>
          ))
        )}
      </section>
    </section>
  );
}
