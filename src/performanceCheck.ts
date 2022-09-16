import config from "./config";
import { WordClass } from "./types";

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
              $nin: [
                WordClass.Adjective,
                WordClass.Verb,
                WordClass.Postposition,
              ],
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
  }
};

run().then();
