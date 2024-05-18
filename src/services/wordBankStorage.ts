import { ChromeStorage } from "./chromeStorage";

import { SavedWord } from "./wordBankStorage.type";

class WordBankStorage extends ChromeStorage {
  _key = "WORD_BANK";

  constructor() {
    super("local");
  }

  async addNewWord({
    sourceText,
    translatedText,
  }: {
    sourceText: string;
    translatedText: string;
  }) {
    const currentSavedWords = (await this.get(this._key, [])) as SavedWord[];

    const existed = currentSavedWords.find(
      (item) => item.sourceText === sourceText
    );

    if (existed) {
      if (existed.translatedTextList.includes(translatedText)) {
        return;
      }
      existed.translatedTextList.push(translatedText);
      existed.updatedAt = new Date().toISOString();
      this.set(this._key, currentSavedWords);
    }

    const word = {
      sourceText: sourceText,
      translatedTextList: [translatedText],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const newSavedWords = [...currentSavedWords, word];

    this.set(this._key, newSavedWords);
  }

  async removeWord({ sourceText }: { sourceText: string }) {
    const currentSavedWords = (await this.get(this._key, [])) as SavedWord[];

    const existed = currentSavedWords.find(
      (item) => item.sourceText === sourceText
    );

    if (existed) {
      this.set(
        this._key,
        currentSavedWords.filter((word) => word.sourceText !== sourceText)
      );
    }
  }

  async getAll(): Promise<SavedWord[]> {
    const result = (await this.get(this._key, [])) as SavedWord[];

    // sort DESC
    return result.sort((a, b) =>
      new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1
    );
  }

  async findWord(text: string): Promise<SavedWord> {
    const allWords = await this.getAll();
    return allWords.find((item) => item.sourceText === text);
  }

  async isSaved(text: string) {
    return !!(await this.findWord(text));
  }
}

export const wordBankStorage = new WordBankStorage();