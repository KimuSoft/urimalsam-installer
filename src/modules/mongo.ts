import { Word } from "../types";
import { MongoClient } from "mongodb";
import config from "../config";

export default async (words: Word[], args: string[]) => {
  const client = new MongoClient(config.db);

  try {
    console.info("Start to connect to MongoDB");
    await client.connect();

    if (args.includes("--rm")) {
      console.info("Start to remove all documents");
      await client.db().collection("words").deleteMany({});
      console.info("Finish to remove all documents");
    }

    console.info("Inserting words to MongoDB");
    await client.db().collection(config.table).insertMany(words);
  } finally {
    console.info("Closing MongoDB connection");
    await client.close();
  }
};
