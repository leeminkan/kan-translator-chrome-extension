import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "./queryKey";

export const useTextSelection = () => {
  return useQuery(queryKeys.textSelection());
};
