"use client";

import { useState } from "react";
import Link from "next/link";
import Markdown from "react-markdown";
import type { getWebsiteWithFeaturesBySlug } from "@/db/queries/websites";

type WebsiteWithFeatures = NonNullable<
  Awaited<ReturnType<typeof getWebsiteWithFeaturesBySlug>>
>;

type WebsiteClientProps = {
  website: WebsiteWithFeatures;
};

export default function WebsiteClient({ website }: WebsiteClientProps) {
  const [activeFeature, setActiveFeature] = useState(
    website.features.length ? website.features[0] : null,
  );

  return (
    <section>
      <div className="flex flex-row gap-x-8">
        <div className="py-12">
          <nav>
            <div>
              <h1 className="text-3xl font-semibold">{website.name}</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                {website.url}
              </p>
              <Link
                href={`/sites/${website.slug}/features/create`}
                className="rounded bg-gray-900 px-4 py-2 text-sm font-medium text-white"
              >
                Create feature
              </Link>
            </div>
            <div>
              {website.features.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No features yet.
                </p>
              ) : (
                <ul className="flex flex-col gap-y-4 py-4">
                  {website.features.map((feature) => (
                    <li
                      key={feature.id}
                      onClick={() => setActiveFeature(feature)}
                    >
                      {feature.title}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </nav>
        </div>
        <section>
          <div>
            {activeFeature ? (
              <div className="flex flex-col gap-y-6">
                <Link
                  href={`${website.slug}/features/${activeFeature.id}/edit`}
                >
                  Edit feature
                </Link>
                <h1>{activeFeature.title}</h1>
                <Markdown>{activeFeature.markdown}</Markdown>
              </div>
            ) : (
              <h1>Select a feature</h1>
            )}
          </div>
        </section>
      </div>
    </section>
  );
}
