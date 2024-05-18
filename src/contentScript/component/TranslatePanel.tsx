import React, { useCallback, useEffect, useMemo } from "react";

import { useGoogleTranslatorMutation } from "@/src/mutation/useGoogleTranslatorMutation";
import { useCustomTranslatorMutation } from "@/src/mutation/useCustomTranslatorMutation";
import { useIsWordSaved } from "@/src/queries/useWordBankQueries";
import { useWordBank } from "@/src/hooks/useWordBank";

import { AddButtonIcon } from "../../popup/component/TranslateTab/AddButtonIcon";
import { PronunciationRow } from "../../popup/component/TranslateTab/PronunciationRow";
import { ResultSkeleton } from "../../popup/component/TranslateTab/ResultSkeleton";

export const TranslatePanel = ({ sourceText }) => {
  const { addNewWord } = useWordBank();
  const googleTranslatorMutation = useGoogleTranslatorMutation();
  const customTranslatorMutation = useCustomTranslatorMutation();
  const isWordSavedQuery = useIsWordSaved(sourceText);

  useEffect(() => {
    Promise.all([
      customTranslatorMutation.mutateAsync({
        sourceText,
      }),
      googleTranslatorMutation.mutateAsync({
        sourceText,
      }),
    ]);
  }, []);

  const addNewWordFn = useCallback(async () => {
    addNewWord({
      sourceText: googleTranslatorMutation.data.sourceText,
      translatedText: googleTranslatorMutation.data.translatedText,
    });
  }, [googleTranslatorMutation]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "s") {
        // quick save
        e.preventDefault();
        addNewWordFn();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [sourceText, addNewWord]);

  return (
    <div className="flex flex-col px-2 py-2">
      {googleTranslatorMutation.isPending && <ResultSkeleton />}
      {googleTranslatorMutation.data && (
        <div className="flex flex-col mt-2 px-2 py-2 bg-white gap-2">
          <h2 className="text-2xl">
            {googleTranslatorMutation.data.sourceText}
          </h2>
          <PronunciationRow
            pronunciation={customTranslatorMutation.data?.data?.pronunciation}
            isLoading={customTranslatorMutation.isPending}
          />
          <div className="flex justify-between items-center mt-2 px-2 py-2 bg-slate-400">
            <h3 className="text-xl">
              {googleTranslatorMutation.data.translatedText}
            </h3>
            {!isWordSavedQuery.isPending && (
              <AddButtonIcon
                className="h-6 w-6"
                onClick={addNewWordFn}
                isSaved={isWordSavedQuery.data}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
