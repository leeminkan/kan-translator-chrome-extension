import { useQuery } from "@tanstack/react-query";

import { wordBankStorage } from "@/src/services/wordBankStorage";

export const useWordBank = () => {
  return useQuery({
    queryKey: [wordBankStorage._key],
    queryFn: async () => {
      return wordBankStorage.getAll();
    },
  });
};
