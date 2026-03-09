import {
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const featuresTable = pgTable("Features", {
  id: integer().primaryKey().notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  featureName: varchar("feature_name").notNull(),
  markdown: text("markdown").notNull(),
});

export type InsertFeature = typeof featuresTable.$inferInsert;
export type SelectFeature = typeof featuresTable.$inferSelect;
