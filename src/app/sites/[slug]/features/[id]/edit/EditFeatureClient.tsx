"use client";

import FeatureForm from "@/components/FeatureForm";
import type { getFeatureById } from "@/db/queries/features";
import { editFeatureAction } from "./actions";

type Feature = Awaited<ReturnType<typeof getFeatureById>>[number];

type EditFeatureClientProps = {
  feature: Feature;
  siteSlug: string;
};

export default function EditFeatureClient({
  feature,
  siteSlug,
}: EditFeatureClientProps) {
  return (
    <section className="py-12">
      <h1 className="text-2xl font-semibold">Edit feature</h1>
      <div className="mt-8">
        <FeatureForm
          siteId={feature.siteId}
          siteSlug={siteSlug}
          featureId={feature.id}
          featureData={{ title: feature.title, markdown: feature.markdown }}
          action={editFeatureAction}
        />
      </div>
    </section>
  );
}
