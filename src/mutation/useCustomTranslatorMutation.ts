import { useMutation } from "@tanstack/react-query";

import { customTranslator } from "@/src/services/customTranslator";

export const useCustomTranslatorMutation = () => {
  return useMutation({
    mutationFn: (variable: { sourceText: string }) =>
      customTranslator.translateAsync(variable.sourceText),
    retry: 3,
  });
};
