import xlsx from "node-xlsx";

import { toIpfString } from "hypua";
import * as fs from "fs";
import { Word } from "./types";
import {
  convertRegion,
  convertWordClass,
  convertWordType,
} from "./utils/convert";

const LoadWordData = () => {
  const entryWords = [];
  const reversedEasyCounts: Record<number, string[]> = {};

  const files = fs.readdirSync("./data");
  const xlsxFiles = files.filter((file) => file.endsWith(".xls"));

  const words: Word[] = [];
  let index = 0;
  for (const file of xlsxFiles) {
    console.info(`Loading ${file}`);
    const workSheetsFromFile = xlsx.parse(`./data/${file}`);
    const workSheet = workSheetsFromFile[0];

    let innerIndex = 0;
    for (const row of workSheet.data as string[]) {
      index++;
      innerIndex++;
      if (innerIndex === 1) break;
      if (["속담", "관용구"].includes(row[1])) continue;

      words.push({
        word: toIpfString(row[0]).replace(/[-^\s]/g, ""),
        sense: toIpfString(row[11]),
        senseId: parseInt(row[10]),
        region: convertRegion(row[15]),
        wordType: convertWordType(row[2]),
        wordClass: convertWordClass(row[9]),
        category: row[17] || undefined,
      });
    }
    break;
  }

  fs.writeFileSync("./data/words.json", JSON.stringify(words, null, 2));
  console.info(`Loaded ${words.length} words`);
};

LoadWordData();
