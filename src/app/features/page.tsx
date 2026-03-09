import { getAllFeatures } from "@/db/queries/features";
import Link from "next/link";
import { Suspense } from "react";

async function FeaturesData() {
  const allFeatures = await getAllFeatures();

  return (
    <section className="flex flex-col gap-y-4">
      {allFeatures.map((feature) => (
        <article key={feature.id}>
          <h1>
            <Link href={`/features/${feature.id}`} className="hover:underline">
              {feature.title}
            </Link>
          </h1>
          <time dateTime={feature.createdAt.toISOString()}>
            {feature.createdAt.toLocaleDateString()}
          </time>
          <div className="prose">{feature.markdown}</div>
        </article>
      ))}
    </section>
  );
}

export default function Features() {
  return (
    <Suspense fallback={<div>Loading features...</div>}>
      <FeaturesData />
    </Suspense>
  );
}
