import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const drinks = pgTable("drinks", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sizeOz: integer("size_oz").notNull(),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
  note: text("note"),
});

export const insertDrinkSchema = createInsertSchema(drinks).omit({
  id: true,
}).extend({
  timestamp: z.coerce.date().optional(),
});

export type InsertDrink = z.infer<typeof insertDrinkSchema>;
export type Drink = typeof drinks.$inferSelect;
