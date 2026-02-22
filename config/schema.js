


// import { integer, pgTable, varchar, serial } from "drizzle-orm/pg-core";

// export const UsersTable = pgTable("users", {
//   id: serial("id").primaryKey(),

//   name: varchar("name", { length: 255 }).notNull(),

//   age: integer("age").notNull(),

//   email: varchar("email", { length: 255 }).notNull(),

//   imageUrl: varchar("image_url", { length: 500 }).notNull(),

//   credits: integer("credits").notNull().default(3),
// });

import { integer, pgTable, varchar ,serial } from "drizzle-orm/pg-core";

export const UsersTable= pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar( 'name' ).notNull(),
  
  age: integer().notNull(),
  email: varchar( 'email' ).notNull(),
  imageUrl: varchar( 'image_url' ).notNull(),
  credits: integer().notNull().default(3),
});
