import config from "./config";
import { Pos } from "./types";
import * as knex from "knex";

const run = async () => {
  if (config.db.startsWith("mongodb")) {
    const { MongoClient } = await import("mongodb");
    const client = new MongoClient(config.db);
    try {
      console.info("Start to connect to MongoDB");
      await client.connect();
      const db = client.db().collection(config.table);

      console.time("Random");
      await db.aggregate([{ $sample: { size: 1 } }]).toArray();
      console.timeEnd("Random");

      console.time("FindOne");
      await db.findOne({ word: "사과" });
      console.timeEnd("FindOne");

      console.time("FindMany");
      await db.find({ word: "사과" });
      console.timeEnd("FindMany");

      console.time("FindMany with Complex condition");
      await db.aggregate([
        {
          $match: {
            word: { $regex: /^[늣릇]+/ },
            wordClass: {
              $nin: [Pos.Adjective, Pos.Verb, Pos.Postposition],
            },
          },
        },
        {
          $group: {
            _id: "$word",
            senses: { $push: "$sense" },
          },
        },
      ]);
      console.timeEnd("FindMany with Complex condition");
    } finally {
      console.info("Closing MongoDB connection");
      await client.close();
    }
  } else {
    console.info("Start to connect to SQL Database");
    const client = knex.default({
      client: config.db.split("://")[0].replace("postgresql", "pg"),
      connection: config.db,
    });

    console.time("Random");
    await client.raw("SELECT * FROM words ORDER BY RANDOM() LIMIT 1");
    console.timeEnd("Random");
  }
};

run().then();
