import { eq } from "drizzle-orm";
import { db } from "@/db/db";
import { InsertFeature, featuresTable } from "@/db/schema";

export async function getAllFeatures() {
  return db.select().from(featuresTable);
}

export async function getFeatureById(id: number) {
  return db.select().from(featuresTable).where(eq(featuresTable.id, id));
}

export async function createFeature(data: InsertFeature) {
  await db.insert(featuresTable).values(data);
}
