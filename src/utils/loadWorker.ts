import { convertRegion, convertWordClass, convertWordType } from "./convert";
import xlsx from "node-xlsx";
import { Word } from "../types";
import { toIpfString } from "hypua";

export default (path: string) => {
  console.info(`Start to parse: ${path}`);
  const workSheetsFromFile = xlsx.parse(path);

  console.info(`Start to convert: ${path}`);
  const workSheet = workSheetsFromFile[0];

  const words: Word[] = [];
  let index = 0;
  for (const row of workSheet.data as string[]) {
    index++;
    if (index === 1) continue;
    if (["속담", "관용구"].includes(row[1])) continue;

    try {
      words.push({
        word: toIpfString(row[0]).replace(/[-^\s]/g, ""),
        sense: toIpfString(row[11]),
        senseId: parseInt(row[10]),
        region: convertRegion(row[15]),
        wordType: convertWordType(row[2]),
        wordClass: convertWordClass(row[9]),
        category: row[17].replace(/[『』]/g, "") || undefined,
      });
    } catch (error) {
      console.error(error);
      console.warn(`Failed to parse: ${row}`);
    }
  }

  console.info(`Finish to convert: ${path}`);
  return words;
};
