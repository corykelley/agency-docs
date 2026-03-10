import { eq } from "drizzle-orm";
import { db } from "@/db/db";
import {
  InsertWebsite,
  InsertWebsiteMember,
  websiteMembersTable,
  websitesTable,
} from "../schema";

export async function getWebsitesByUser(userId: string) {
  const rows = await db
    .select({
      id: websitesTable.id,
      createdAt: websitesTable.createdAt,
      name: websitesTable.name,
      slug: websitesTable.slug,
      url: websitesTable.url,
    })
    .from(websitesTable)
    .innerJoin(
      websiteMembersTable,
      eq(websitesTable.id, websiteMembersTable.websiteId)
    )
    .where(eq(websiteMembersTable.userId, userId));
  return rows;
}

export async function addWebsiteMember(data: InsertWebsiteMember) {
  return db.insert(websiteMembersTable).values(data).returning();
}

export async function getWebsiteById(id: number) {
  return db.query.websitesTable.findFirst({
    where: (websites, { eq }) => eq(websites.id, id),
  });
}

export async function getWebsiteWithFeatures(id: number) {
  return db.query.websitesTable.findFirst({
    where: (websites, { eq }) => eq(websites.id, id),
    with: {
      features: true,
    },
  });
}

export async function getWebsiteBySlug(slug: string) {
  return db.query.websitesTable.findFirst({
    where: (websites, { eq }) => eq(websites.slug, slug),
  });
}

export async function getWebsiteWithFeaturesBySlug(slug: string) {
  return db.query.websitesTable.findFirst({
    where: (websites, { eq }) => eq(websites.slug, slug),
    with: {
      features: true,
    },
  });
}

export async function createWebsite(data: InsertWebsite) {
  return db.insert(websitesTable).values(data).returning();
}
