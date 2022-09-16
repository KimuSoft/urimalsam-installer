import path from "path";
import fs from "fs";
import config from "./config";
import mongo from "./modules/mongo";
import { Word } from "./types";
import * as process from "process";

const dir = path.resolve(__dirname, "..", "data", "words.json");
const args = process.argv.filter((a) => ["--rm"].includes(a));

const setup = async () => {
  if (!fs.existsSync(dir)) {
    console.error("Please run 'yarn setup' first");
    process.exit(1);
  }

  const words = JSON.parse(fs.readFileSync(dir, "utf-8")) as Word[];

  if (config.db.startsWith("mongodb")) {
    await mongo(words, args);
  } else {
  }

  console.info("Done");
  process.exit();
};

setup().then();
