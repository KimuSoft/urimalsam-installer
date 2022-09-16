import { Region, WordClass, WordType } from "../types";

export const convertWordType = (wordType: string): WordType => {
  switch (wordType) {
    case "고유어":
      return WordType.Native;
    case "한자":
      return WordType.Chinese;
    case "외래어":
      return WordType.Loanword;
    case "혼종어":
      return WordType.Hybrid;
    default:
      return WordType.Unknown;
  }
};

export const convertWordClass = (wordClass: string): WordClass => {
  switch (wordClass) {
    case "명사":
      return WordClass.Noun;
    case "대명사":
      return WordClass.Pronoun;
    case "수사":
      return WordClass.Numeral;
    case "조사":
      return WordClass.Postposition;
    case "동사":
      return WordClass.Verb;
    case "형용사":
      return WordClass.Adjective;
    case "관형사":
      return WordClass.Determiner;
    case "부사":
      return WordClass.Adverb;
    case "감탄사":
      return WordClass.Interjection;
    case "접사":
      return WordClass.Affix;
    case "의존 명사":
      return WordClass.DependentNoun;
    case "보조 동사":
      return WordClass.AuxiliaryVerb;
    case "보조 형용사":
      return WordClass.AuxiliaryAdjective;
    case "어미":
      return WordClass.Ending;
    case "관·명":
      return WordClass.DeterminerNoun;
    case "수·관":
      return WordClass.NumeralDeterminer;
    case "명·부":
      return WordClass.NounAdverb;
    case "감·명":
      return WordClass.InterjectionNoun;
    case "대·부":
      return WordClass.PronounAdverb;
    case "대·감":
      return WordClass.PronounInterjection;
    case "동·형":
      return WordClass.VerbAdjective;
    case "관·감":
      return WordClass.DeterminerInterjection;
    case "부·감":
      return WordClass.AdverbInterjection;
    case "의명·조":
      return WordClass.DependentNounPostposition;
    case "수·관·명":
      return WordClass.NumeralDeterminerNoun;
    case "대·관":
      return WordClass.PronounDeterminer;
    case "품사 없음":
      return WordClass.None;
    default:
      throw new Error(`Unknown word class: ${wordClass}`);
  }
};

export const convertRegion = (region: string): Region => {
  switch (region) {
    case "방언":
      return Region.Dialect;
    case "옛말":
      return Region.Ancient;
    case "북한어":
      return Region.NKorean;
    default:
      return Region.General;
  }
};
