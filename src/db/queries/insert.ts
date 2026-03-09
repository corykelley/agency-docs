import { desc } from "drizzle-orm";
import { db } from "../index";
import { InsertFeature, featuresTable } from "../schema";

export async function getNextFeatureId(): Promise<number> {
  const [row] = await db
    .select({ id: featuresTable.id })
    .from(featuresTable)
    .orderBy(desc(featuresTable.id))
    .limit(1);
  return (row?.id ?? 0) + 1;
}

export async function createFeature(data: InsertFeature) {
  await db.insert(featuresTable).values(data);
}
