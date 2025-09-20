import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal, timestamp, json, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const vehicles = pgTable("vehicles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  plate: text("plate").notNull(),
  color: text("color").notNull(),
  year: integer("year").notNull(),
  odometer: integer("odometer").notNull().default(0),
  fuelType: text("fuel_type").notNull(),
  status: text("status").notNull().default("active"), // active, sold, inactive
  createdAt: timestamp("created_at").defaultNow(),
});

export const vehicleEvents = pgTable("vehicle_events", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  vehicleId: varchar("vehicle_id").notNull().references(() => vehicles.id),
  type: text("type").notNull(), // fuel, maintenance, repair, accident, inspection, insurance, milestone
  title: text("title").notNull(),
  description: text("description"),
  location: text("location"),
  odometer: integer("odometer").notNull(),
  cost: decimal("cost", { precision: 10, scale: 2 }).notNull().default("0"),
  date: timestamp("date").notNull().defaultNow(),
  details: json("details"), // JSON object with event-specific data
  nextAction: text("next_action"),
  images: json("images").array(), // Array of image URLs
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertVehicleSchema = createInsertSchema(vehicles).omit({
  id: true,
  createdAt: true,
});

export const insertVehicleEventSchema = createInsertSchema(vehicleEvents).omit({
  id: true,
  createdAt: true,
});

export type InsertVehicle = z.infer<typeof insertVehicleSchema>;
export type Vehicle = typeof vehicles.$inferSelect;
export type InsertVehicleEvent = z.infer<typeof insertVehicleEventSchema>;
export type VehicleEvent = typeof vehicleEvents.$inferSelect;
