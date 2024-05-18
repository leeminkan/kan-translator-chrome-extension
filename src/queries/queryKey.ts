import { wordBankStorage } from "@/src/services/wordBankStorage";

export const queryKeys = {
  wordBank: {
    baseKey: [wordBankStorage._key],
    list: () => {
      return {
        queryKey: [wordBankStorage._key, "list"],
        queryFn: async () => {
          return wordBankStorage.getAll();
        },
      };
    },
    isWordSaved: ({ word }: { word: string }) => {
      return {
        queryKey: [wordBankStorage._key, "isWordSaved", word],
        queryFn: async () => {
          return await wordBankStorage.isSaved(word);
        },
      };
    },
  },
};
