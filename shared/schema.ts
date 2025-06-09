import { pgTable, text, serial, integer, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password"),
  discordId: text("discord_id").unique(),
  discordUsername: text("discord_username"),
  avatar: text("avatar"),
});

export const userProfiles = pgTable("user_profiles", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  weight: real("weight").notNull(),
  bodyFat: real("body_fat").notNull(),
  targetWeight: real("target_weight").notNull(),
  inbodyScore: integer("inbody_score").notNull(),
  bmr: integer("bmr").notNull(),
  activityLevel: real("activity_level").notNull().default(1.375),
  timeline: integer("timeline").notNull().default(90),
  createdAt: text("created_at").notNull().default("now()"),
});

export const dailyIntake = pgTable("daily_intake", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  date: text("date").notNull(),
  mealType: text("meal_type").notNull(), // lunch, dinner
  itemName: text("item_name").notNull(),
  calories: real("calories").notNull(),
  carbs: real("carbs").notNull(),
  protein: real("protein").notNull(),
  fat: real("fat").notNull(),
  fiber: real("fiber").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
}).extend({
  password: z.string().optional(),
});

export const insertDiscordUserSchema = createInsertSchema(users).pick({
  discordId: true,
  discordUsername: true,
  avatar: true,
});

export const insertUserProfileSchema = createInsertSchema(userProfiles).omit({
  id: true,
  createdAt: true,
});

export const insertDailyIntakeSchema = createInsertSchema(dailyIntake).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type UserProfile = typeof userProfiles.$inferSelect;
export type InsertUserProfile = z.infer<typeof insertUserProfileSchema>;
export type DailyIntake = typeof dailyIntake.$inferSelect;
export type InsertDailyIntake = z.infer<typeof insertDailyIntakeSchema>;
