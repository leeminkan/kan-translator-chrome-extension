interface DictionaryEntry {
  word: string;
  reverse_translation: string[];
}

interface DictionaryItem {
  pos: string;
  terms: string[];
  entry: DictionaryEntry[];
  base_form: string;
  pos_enum: number;
}

interface Sentence {
  trans: string;
  orig: string;
  backend: number;
}

export interface GoogleTranslatorResponse {
  sentences: Sentence[];
  dict: DictionaryItem[];
  src: string;
  spell: Record<string, never>; // Assuming this is always an empty object
}

interface LanguageTranslations {
  [key: string]: string;
}

export interface GetSupportedLanguageResponse {
  sl: LanguageTranslations;
  tl: LanguageTranslations;
  al: Record<string, never>; // Assuming this is always an empty object
}
