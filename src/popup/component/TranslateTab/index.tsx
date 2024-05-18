import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { Input } from "@/src/components/ui/input";
import { useGoogleTranslatorMutation } from "@/src/mutation/useGoogleTranslatorMutation";
import { useCustomTranslatorMutation } from "@/src/mutation/useCustomTranslatorMutation";
import { useWordBank } from "@/src/hooks/useWordBank";
import { useIsWordSaved } from "@/src/queries/useWordBankQueries";

import { AddButtonIcon } from "./AddButtonIcon";
import { PronunciationRow } from "./PronunciationRow";
import { ResultSkeleton } from "./ResultSkeleton";
import { Inputs } from "../../popup.types";

export const TranslateTab = () => {
  const { register, handleSubmit } = useForm<Inputs>();
  const { addNewWord } = useWordBank();

  const googleTranslatorMutation = useGoogleTranslatorMutation();
  const customTranslatorMutation = useCustomTranslatorMutation();

  const isWordSavedQuery = useIsWordSaved(
    googleTranslatorMutation.data?.sourceText ?? ""
  );

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await Promise.all([
      customTranslatorMutation.mutateAsync({
        sourceText: data.text,
      }),
      googleTranslatorMutation.mutateAsync({
        sourceText: data.text,
      }),
    ]);
  };

  return (
    <div className="flex flex-col px-2 py-2">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          autoFocus
          {...register("text")}
          placeholder="Enter text to translate..."
        />
      </form>
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
                onClick={() => {
                  addNewWord({
                    sourceText: googleTranslatorMutation.data.sourceText,
                    translatedText:
                      googleTranslatorMutation.data.translatedText,
                  });
                }}
                isSaved={isWordSavedQuery.data}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};