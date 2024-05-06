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

export const imagesRelations = relations(images, ({ many }) => ({
  minis: many(minis),
}));

export const beasts = createTable("beasts",
  {
    id: serial("id").primaryKey(),
    species: varchar("species", { length: 256 }),
    size: varchar("size", { length: 1024 }),
    base: varchar("base", { length: 1024 }),
    cost: integer('cost'),
    m: varchar("m", { length: 256 }),
    s: varchar("s", { length: 256 }),
    b: varchar("b", { length: 256 }),
    r: varchar("r", { length: 256 }),
    n: varchar("n", { length: 256 }),
    c: varchar("c", { length: 256 }),
    a: varchar("a", { length: 256 }),
    f: varchar("f", { length: 256 }),
    p: varchar("p", { length: 256 }),
    skills: json('items').$type<string[]>(),
    rare: boolean('rare'),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt"),
  },
  (example) => ({
    speciesIndex: index("beasts_speciesx").on(example.species),
  })
);

export const beastsRelations = relations(beasts, ({ many }) => ({
  minis: many(minis),
}));

export const skills = createTable("skills",
  {
    id: serial("id").primaryKey(),
    group: varchar("group", { length: 256 }),
    name: varchar("name", { length: 256 }),
    round: varchar("round", { length: 256 }),
    modifier: json('modifier').$type<string[]>(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt"),
  },
  (example) => ({
    skillsIndex: index("skills_group").on(example.group),
  })
);

export const skillsRelations = relations(skills, ({ many }) => ({
  skillsToMinis: many(skillsToMinis),
}));

export const minis = createTable("minis",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    description: varchar("name", { length: 2256 }),
    items: json('items').$type<string[]>(),
    cost: integer('cost'),
    species: varchar("species", { length: 256 }),
    imageId: integer('imageId'),
    userId: varchar("userId", {length:256}).notNull(),
    speciesId: integer('speciesId'),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt"),
  },
  (example) => ({
    nameIndex: index("mini_idx").on(example.name),
  })
);

export const minisRelations = relations(minis, ({ many, one }) => ({
  image: one(images, {
    fields: [minis.imageId],
    references: [images.id],
  }),
  species: one(beasts, {
    fields: [minis.speciesId],
    references: [beasts.id],
  }),
  minisToWarbands: many(minisToWarbands),
  skillsToMinis: many(skillsToMinis)
}));

// export const minisToSkills = pgTable(
//   'minis_to_skills',
//   {
//     skillId: integer('skill_id')
//       .notNull()
//       .references(() => skills.id),
//     miniId: integer('mini_id')
//       .notNull()
//       .references(() => minis.id),
//   },
//   (t) => ({
//     pk: primaryKey({ columns: [t.skillId, t.miniId] }),
//   }),
// );

// export const skillsToMinisRelations = relations(skillsToMinis, ({ one }) => ({
//   skill: one(skills, {
//     fields: [skillsToMinis.skillId],
//     references: [skills.id],
//   }),
//   mini: one(minis, {
//     fields: [skillsToMinis.miniId],
//     references: [minis.id],
//   }),
// }));

export const skillsToMinis = pgTable(
  'skills_to_minis',
  {
    skillId: integer('skill_id')
      .notNull()
      .references(() => skills.id),
    miniId: integer('mini_id')
      .notNull()
      .references(() => minis.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.skillId, t.miniId] }),
  }),
);

export const skillsToMinisRelations = relations(skillsToMinis, ({ one }) => ({
  skill: one(skills, {
    fields: [skillsToMinis.skillId],
    references: [skills.id],
  }),
  mini: one(minis, {
    fields: [skillsToMinis.miniId],
    references: [minis.id],
  }),
}));





export const warbands = createTable("warbands",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }),
    userId: varchar("userId", {length:256}),
    allegience: varchar("allegience", { length: 1024 }),
    den: varchar("den", { length: 256 }),
    pennies: integer("pennies"),
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
  // species: one(beasts, {
  //   fields: [minis.speciesId],
  //   references: [beasts.id],
  // }),
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

export const games = createTable("games",
  {
    id: serial("id").primaryKey(),
    p1Id: varchar("p1Id", {length:256}),
    p1WarbandId: integer("p1WarbandId"),
    p2Id: varchar("p2Id", {length:256}),
    p2WarbandId: integer('p2WarbandId'),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt"),
  },
  (example) => ({
    p1Index: index("game_p1x").on(example.p1Id),
    p2Index: index("game_p2x").on(example.p2Id),
  })
);

export const gamesRelations = relations(games, ({ many, one }) => ({
  p1Warband: one(warbands, {
    fields: [games.p1WarbandId],
    references: [warbands.id],
  }),
  p2Warband: one(warbands, {
    fields: [games.p2WarbandId],
    references: [warbands.id],
  }),
}));

  // p1Rosta: many(minis, {
  //   fields: [minisToWarbands.warbandId],
  //   references: [warbands.id],
  // }),

