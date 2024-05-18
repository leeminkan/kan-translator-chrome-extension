import { useQueryClient } from "@tanstack/react-query";

import { wordBankStorage } from "@/src/services/wordBankStorage";
import { queryKeys } from "@/src/queries/queryKey";

export const useWordBank = () => {
  const queryClient = useQueryClient();

  const removeWord = async ({ sourceText }: { sourceText: string }) => {
    await wordBankStorage.removeWord({ sourceText });
    queryClient.invalidateQueries({
      queryKey: queryKeys.wordBank.baseKey,
    });
  };

  const addNewWord = async ({
    sourceText,
    translatedText,
  }: {
    sourceText: string;
    translatedText: string;
  }) => {
    await wordBankStorage.addNewWord({
      sourceText,
      translatedText,
    });
    queryClient.invalidateQueries({
      queryKey: queryKeys.wordBank.baseKey,
    });
  };

  return {
    removeWord,
    addNewWord,
  };
};
