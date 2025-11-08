const { integer, pgTable, varchar, json, timestamp } = require("drizzle-orm/pg-core");

const usersTable = pgTable("users", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	email: varchar({ length: 255 }).notNull().unique(),
	password: varchar({ length: 255 }).notNull(),
});

const translationsTable = pgTable("translations", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	language: varchar({ length: 255 }).notNull().unique(),
	translations: json().notNull(),
});

const productsTable = pgTable("products", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	articleNo: varchar(),
	name: varchar(),
	inPrice: integer(),
	price: integer(),
	unit: varchar(),
	inStock: integer(),
	description: varchar(),
	createdAt: timestamp().notNull().defaultNow(),
	userId: integer().notNull().references(() => usersTable.id),
});

module.exports = { usersTable, translationsTable, productsTable };
