interface Pronunciation {
  lang: string;
  url: string;
  pron: string;
}

interface Example {
  id: number;
  text: string;
  translation: string;
}

interface Definition {
  id: number;
  text: string;
  translation: string;
  example: Example[];
}

interface Verb {
  type: string;
  text: string;
}

interface CustomTranslatorData {
  word: string;
  pos: string[];
  verbs: Verb[];
  pronunciation: Pronunciation[];
  definition: Definition[];
}

export interface CustomTranslatorResponse {
  data: CustomTranslatorData;
  message: string;
}
