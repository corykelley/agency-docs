import { eq } from "drizzle-orm";
import { db } from "../index";
import { SelectFeature, featuresTable } from "../schema";

export async function getAllFeatures() {
  return db.select().from(featuresTable);
}

export async function getFeatureById(
  id: SelectFeature["id"],
): Promise<SelectFeature[]> {
  return db.select().from(featuresTable).where(eq(featuresTable.id, id));
}
