import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "./queryKey";

export const useWordBankList = () => {
  return useQuery(queryKeys.wordBank.list());
};

export const useIsWordSaved = (word: string) => {
  return useQuery(queryKeys.wordBank.isWordSaved({ word }));
};
