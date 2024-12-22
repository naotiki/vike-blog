import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { userTable } from "./lucia-auth";
import { relations } from "drizzle-orm";

export const usersRelations = relations(userTable, ({ many }) => ({
	posts: many(postTable),
}));

// Example of defining a schema in Drizzle ORM:
export const postTable = sqliteTable("posts", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  title: text("title", { length: 50 }).notNull(),
  content: text("content").notNull(),
  userId: text("userId").notNull(),
});

// You can then infer the types for selecting and inserting
export type PostItem = typeof postTable.$inferSelect;
export type PostInsert = typeof postTable.$inferInsert;
export const postsRelations = relations(postTable, ({ one }) => ({
	author: one(userTable, {
		fields: [postTable.userId],
		references: [userTable.id],
	}),
}));