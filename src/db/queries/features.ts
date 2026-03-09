import { desc, eq } from "drizzle-orm";
import { db } from "../index";
import { InsertFeature, SelectFeature, featuresTable } from "../schema";

export async function getNextFeatureId(): Promise<number> {
  const [row] = await db
    .select({ id: featuresTable.id })
    .from(featuresTable)
    .orderBy(desc(featuresTable.id))
    .limit(1);
  return (row?.id ?? 0) + 1;
}

export async function getAllFeatures() {
  return db.select().from(featuresTable);
}

export async function getFeatureById(id: SelectFeature["id"]) {
  return db.select().from(featuresTable).where(eq(featuresTable.id, id));
}

export async function createFeature(data: InsertFeature) {
  await db.insert(featuresTable).values(data);
}
