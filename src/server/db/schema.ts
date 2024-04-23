// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from "drizzle-orm";
import {
  index,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
  json,
  boolean,
  integer,
  PgTable,
  pgTable,
  primaryKey,
} from "drizzle-orm/pg-core";
// import { PrimaryKey } from "drizzle-orm/sqlite-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `soil_${name}`);

export const images = createTable("images",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    url: varchar("url", { length: 1024 }).notNull(),
    userId: varchar("userId", {length:256}).notNull(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt"),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  })
);

// import * as schema1 from './schema1';
// import * as schema2 from './schema2';
// import { drizzle } from 'drizzle-orm/...';
// const db = drizzle(client, { schema: { ...schema1, ...schema2 } });
// const result = await db.query.users.findMany({
//   with: {
//     posts: true      
//   },
// });

// const product = await tx
//   .insert(products)
//   .values({
//     entityId: input.entityId,
//     eventType: input.eventType,
//     // payload: input.payload, Instead use 👇
//     payload: sql`${input.payload}::json`, // or ::jsonb
//   }) https://stackoverflow.com/questions/76503705/drizzle-columns-schema-json-stores-my-json-as-text-in-postgresql
// type UserId = number & { __brand: 'user_id' };
// type Data = {
//   foo: string;
//   bar: number;
// };
// const users = mysqlTable('users', {
//   id: int('id').$type<UserId>().primaryKey(),images
//   jsonField: json('json_field').$type<Data>(),
// });

export const minis = createTable("minis",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    description: varchar("name", { length: 2256 }),
    items: json('items').$type<string[]>(),
    cost: integer('cost'),
    species: varchar("species", { length: 256 }),
    imageId: integer('imageId').notNull().references(() => images.id),
    userId: varchar("userId", {length:256}).notNull(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt"),
  },
  (example) => ({
    nameIndex: index("mini_idx").on(example.name),
  })
);

export const minisRelations = relations(minis, ({ many }) => ({
  minisToWarbands: many(minisToWarbands),
}));

export const warbands = createTable("warbands",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    url: varchar("url", { length: 1024 }).notNull(),
    userId: varchar("userId", {length:256}).notNull(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt"),
  },
  (example) => ({
    nameIndex: index("warband_idx").on(example.name),
  })
);

export const warbandsRelations = relations(warbands, ({ many }) => ({
  minisToWarbands: many(minisToWarbands),
}));

export const minisToWarbands = createTable('minis_to_warbands',
  {
    miniId: integer('mini_id')
      .notNull()
      .references(() => minis.id),
    warbandId: integer('warbands_id')
      .notNull()
      .references(() => warbands.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.miniId, t.warbandId] }),
  }),
);

export const minisToWarbandsRelations = relations(minisToWarbands, ({ one }) => ({
  warband: one(warbands, {
    fields: [minisToWarbands.warbandId],
    references: [warbands.id],
  }),
  user: one(minis, {
    fields: [minisToWarbands.miniId],
    references: [minis.id],
  }),
}));
