import { Region, Word, WordClass, WordType } from "../types";
import config from "../config";
import * as knex from "knex";

export default async (words: Word[], args: string[]) => {
  console.info("Start to connect to SQL Database");
  const client = knex.default({
    client: config.db.split("://")[0].replace("postgresql", "pg"),
    connection: config.db,
  });

  if (!(await client.schema.hasTable(config.table))) {
    console.info("Create Table");
    await client.schema
      .withSchema("public")
      .createTable(config.table, (table) => {
        table.increments("id").primary();
        table.string("word").notNullable();
        table.text("sense").nullable();
        table.integer("senseId").nullable();
        table.integer("region");
        table.integer("wordType").notNullable();
        table.integer("wordClass").notNullable();
        table.string("category", 50).nullable();
      });
  }

  console.info("Inserting words to SQL Database");

  // for (const w of words) {
  //   if (!w.category) {
  //     // @ts-ignore
  //     w.category = null;
  //   }
  // }

  try {
    await client.batchInsert(config.table, words, 1000);
  } catch (e) {
    console.warn((e as Error).message.slice(0, 300));
    console.warn((e as Error).message.slice((e as Error).message.length - 500));
  }

  console.info("End");
};
