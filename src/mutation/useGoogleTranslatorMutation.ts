import { useMutation } from "@tanstack/react-query";

import { googleTranslator } from "@/src/services/googleTranslator";

import {
  INTERFACE_LANGUAGE_CODE,
  SOURCE_LANGUAGE_CODE,
  TARGET_LANGUAGE_CODE,
} from "@/src/constants/googleTranslator.constant";

export const useGoogleTranslatorMutation = () => {
  return useMutation({
    mutationFn: (variable: { sourceText: string }) =>
      googleTranslator.translateAsync(
        variable.sourceText,
        SOURCE_LANGUAGE_CODE,
        TARGET_LANGUAGE_CODE,
        INTERFACE_LANGUAGE_CODE,
        { translation: true, dictionary: true }
      ),
    retry: 3,
  });
};
