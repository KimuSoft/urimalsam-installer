import { WordGroup, Pos, WordType, WordUnit } from "../types";

export const convertWordUnit = (wordUnit: string): WordUnit => {
  switch (wordUnit) {
    case "단어":
      return WordUnit.Word;
    case "구":
      return WordUnit.Phrase;
    case "관용구":
      return WordUnit.Idiom;
    case "속담":
      return WordUnit.Proverb;
    default:
      throw new Error(`Unknown WordUnit: "${wordUnit}"`);
  }
};

export const convertWordType = (wordType: string): WordType | undefined => {
  if (!wordType) return;
  switch (wordType) {
    case "고유어":
      return WordType.Native;
    case "한자어":
      return WordType.Chinese;
    case "외래어":
      return WordType.Loanword;
    case "혼종어":
      return WordType.Hybrid;
    default:
      return WordType.Unknown;
  }
};

export const convertWordClass = (wordClass: string): Pos => {
  switch (wordClass) {
    case "명사":
      return Pos.Noun;
    case "대명사":
      return Pos.Pronoun;
    case "수사":
      return Pos.Numeral;
    case "조사":
      return Pos.Postposition;
    case "동사":
      return Pos.Verb;
    case "형용사":
      return Pos.Adjective;
    case "관형사":
      return Pos.Determiner;
    case "부사":
      return Pos.Adverb;
    case "감탄사":
      return Pos.Interjection;
    case "접사":
      return Pos.Affix;
    case "의존 명사":
      return Pos.DependentNoun;
    case "보조 동사":
      return Pos.AuxiliaryVerb;
    case "보조 형용사":
      return Pos.AuxiliaryAdjective;
    case "어미":
      return Pos.Ending;
    case "관·명":
      return Pos.DeterminerNoun;
    case "수·관":
      return Pos.NumeralDeterminer;
    case "명·부":
      return Pos.NounAdverb;
    case "감·명":
      return Pos.InterjectionNoun;
    case "대·부":
      return Pos.PronounAdverb;
    case "대·감":
      return Pos.PronounInterjection;
    case "동·형":
      return Pos.VerbAdjective;
    case "관·감":
      return Pos.DeterminerInterjection;
    case "부·감":
      return Pos.AdverbInterjection;
    case "의명·조":
      return Pos.DependentNounPostposition;
    case "수·관·명":
      return Pos.NumeralDeterminerNoun;
    case "대·관":
      return Pos.PronounDeterminer;
    case "품사 없음":
      return Pos.None;
    default:
      throw new Error(`Unknown word class: ${wordClass}`);
  }
};

export const convertRegion = (region: string): WordGroup | undefined => {
  if (!region) return;
  switch (region) {
    case "방언":
      return WordGroup.Dialect;
    case "옛말":
      return WordGroup.Ancient;
    case "북한어":
      return WordGroup.NKorean;
    default:
      return WordGroup.General;
  }
};
