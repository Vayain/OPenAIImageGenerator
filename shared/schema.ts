import { pgTable, text, serial, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const imageGenerations = pgTable("image_generations", {
  id: serial("id").primaryKey(),
  prompt: text("prompt").notNull(),
  imageUrl: text("image_url").notNull(),
  model: varchar("model", { length: 50 }).notNull().default("gpt-4o"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertImageGenerationSchema = createInsertSchema(imageGenerations).pick({
  prompt: true,
  model: true,
}).extend({
  prompt: z.string().min(3, "Prompt must be at least 3 characters long"),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertImageGeneration = z.infer<typeof insertImageGenerationSchema>;
export type ImageGeneration = typeof imageGenerations.$inferSelect;
