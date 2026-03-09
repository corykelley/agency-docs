import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";

export const featuresTable = pgTable("features_table", {
  id: serial("id").primaryKey(),
  createdAt: timestamp().defaultNow().notNull(),
  title: text("title").notNull(),
  markdown: text("markdown").notNull(),
});

export type InsertFeature = typeof featuresTable.$inferInsert;
export type SelectFeature = typeof featuresTable.$inferSelect;
