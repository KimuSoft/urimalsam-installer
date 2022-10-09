import {
  convertRegion,
  convertWordClass,
  convertWordType,
  convertWordUnit,
} from "./convert";
import xlsx from "node-xlsx";
import { Word } from "../types";
import { toIpfString } from "hypua";
import config from "../config";

const field = config.field;

export default (path: string): Word[] => {
  console.info(`Start to parse: ${path}`);
  const workSheetsFromFile = xlsx.parse(path);

  console.info(`Start to convert: ${path}`);
  const workSheet = workSheetsFromFile[0];

  const words: Word[] = [];
  let index = 0;
  for (const row of workSheet.data as string[][]) {
    index++;
    if (index === 1) continue;
    // if (["속담", "관용구"].includes(row[1])) continue;

    try {
      const word = {
        // 어휘
        word: toIpfString(row[0]).replace(/\u00A0/g, ""),
        // 구성 단위
        wordUnit: convertWordUnit(row[1]),
        // 고유어 여부
        wordType: convertWordType(row[2]),
        // 원어·어종
        originDetail: toIpfString(row[3]) || undefined,
        // 원어
        originalLanguage: toIpfString(row[4]) || undefined,
        // 어원
        origin: toIpfString(row[5]) || undefined,
        // 발음
        pronunciation: row[6].replace(/^\[|]$/g, "") || undefined,
        // 활용
        conjugation: row[7] || undefined,
        // 검색용 이형태
        allomorph: row[8] || undefined,
        // 품사
        pos: convertWordClass(row[9]),
        // 의미 번호
        senseNumber: parseInt(row[10]),
        // 뜻풀이
        definition: toIpfString(row[11]),
        // 방언 지역
        region: row[12] || undefined,
        // 문형
        pattern: row[13] || undefined,
        // 문법
        grammar: row[14] || undefined,
        // 범주
        wordGroup: convertRegion(row[15]),
        // 용례
        example: toIpfString(row[16]) || undefined,
        // 전문 분야
        category: row[17].replace(/[『』]/g, "") || undefined,
        // 관련 어휘
        relation: row[18] || undefined,
        // 속담
        proverb: row[19] || undefined,
        // 관용구
        idiom: row[20] || undefined,
        // 대역어
        translation: row[21] || undefined,
        // 생물 분류군 정보
        biologicalClassification: row[22] || undefined,
        // 역사 정보
        history: row[23] || undefined,
        // 수어 정보
        signLanguage: row[24] || undefined,
        // 규범 정보
        norm: row[25] || undefined,
        // 다중 매체(멀티미디어) 정보
        multimedia: row[26] || undefined,
      } as Word;

      // 어휘 (word)
      if (config.removeSymbolFromWord)
        word.word = word.word.replace(/[-^]/g, "");

      if (config.removeSpacingFromWord)
        word.word = word.word.replace(/\s/g, "");

      for (const f in field) {
        if (field[f]) continue;
        delete word[f as keyof Word];
      }

      words.push(word);
    } catch (error) {
      console.error(error);
      console.warn(`Failed to parse: ${row}`);
    }
  }

  console.info(`Finish to convert: ${path}`);
  return words;
};
