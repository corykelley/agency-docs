import { notFound } from "next/navigation";
import { getFeatureById } from "@/db/queries/features";

type Props = { params: Promise<{ id: string }> };

export default async function FeaturePage({ params }: Props) {
  const { id } = await params;
  const idNum = Number(id);
  if (Number.isNaN(idNum)) notFound();

  const rows = await getFeatureById(idNum);
  const feature = rows[0];
  if (!feature) notFound();

  return (
    <article>
      <h1>{feature.featureName}</h1>
      <time dateTime={feature.createdAt.toISOString()}>
        {feature.createdAt.toLocaleDateString()}
      </time>
      <div className="prose">{feature.markdown}</div>
    </article>
  );
}
