import { relations } from "drizzle-orm";
import * as p from "drizzle-orm/pg-core";

export const websitesTable = p.pgTable("websites_table", {
  id: p.serial("id").primaryKey(),
  createdAt: p.timestamp().defaultNow().notNull(),
  name: p.text("name").notNull(),
  slug: p.text("slug").notNull().unique(),
  url: p.text("url").notNull(),
});

export const websiteMembersTable = p.pgTable(
  "website_members_table",
  {
    id: p.serial("id").primaryKey(),
    websiteId: p
      .integer("website_id")
      .notNull()
      .references(() => websitesTable.id, { onDelete: "cascade" }),
    userId: p.text("user_id").notNull(),
    role: p.text("role", { enum: ["owner", "member"] }).notNull(),
    createdAt: p.timestamp().defaultNow().notNull(),
  },
  (t) => [p.unique().on(t.websiteId, t.userId)]
);

export const featuresTable = p.pgTable("features_table", {
  id: p.serial("id").primaryKey(),
  createdAt: p.timestamp().defaultNow().notNull(),
  title: p.text("title").notNull(),
  markdown: p.text("markdown").notNull(),
  siteId: p
    .integer("site_id")
    .notNull()
    .references(() => websitesTable.id),
});

export const websitesRelations = relations(websitesTable, ({ many }) => ({
  features: many(featuresTable),
  members: many(websiteMembersTable),
}));

export const websiteMembersRelations = relations(
  websiteMembersTable,
  ({ one }) => ({
    website: one(websitesTable, {
      fields: [websiteMembersTable.websiteId],
      references: [websitesTable.id],
    }),
  })
);

export const featuresRelations = relations(featuresTable, ({ one }) => ({
  website: one(websitesTable, {
    fields: [featuresTable.siteId],
    references: [websitesTable.id],
  }),
}));

export type InsertFeature = typeof featuresTable.$inferInsert;
export type SelectFeature = typeof featuresTable.$inferSelect;
export type InsertWebsite = typeof websitesTable.$inferInsert;
export type SelectWebsite = typeof websitesTable.$inferSelect;
export type InsertWebsiteMember = typeof websiteMembersTable.$inferInsert;
export type SelectWebsiteMember = typeof websiteMembersTable.$inferSelect;
