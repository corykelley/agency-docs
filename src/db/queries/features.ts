import { db } from "@/db/db";
import { InsertFeature, featuresTable } from "@/db/schema";

export async function getAllFeatures() {
  return db.select().from(featuresTable);
}

export async function createFeature(data: InsertFeature) {
  await db.insert(featuresTable).values(data);
}
