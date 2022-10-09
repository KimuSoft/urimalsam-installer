import * as fs from "fs";
import { Word } from "./types";
import * as path from "path";
import Piscina from "piscina";

const isTS = !!process.argv.find((x) => x.includes("ts-node"));

const LoadWordData = async () => {
  console.time("load");
  const piscina = new Piscina({
    filename: path.resolve(__dirname, "utils", "loadWorker"),
    execArgv: isTS ? ["-r", "ts-node/register"] : [],
  });

  const files = fs.readdirSync("./data");
  const xlsxFiles = files.filter((file) => file.endsWith(".xls"));

  // let l = ora(`Make Worker...`).start();
  console.info(`Make Worker...`);
  const _words = await Promise.all<Word[]>(
    xlsxFiles.map(async (file) =>
      piscina.run(path.resolve(__dirname, "..", "data", file))
    )
  );
  // l.succeed(`Loaded SANS`);
  console.info(`Loaded SANS`);

  const words = _words.reduce((a, b) => [...a, ...b]);

  console.timeEnd("load");
  words.sort(
    (a, b) =>
      a.word.localeCompare(b.word) * 10000 +
      (a.senseNumber - b.senseNumber) / 1000
  );
  fs.writeFileSync("./data/words.json", JSON.stringify(words, null, 2));
  console.info(`Loaded ${words.length.toLocaleString()} words`);
};

LoadWordData().then();
