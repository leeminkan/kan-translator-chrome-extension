import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { Input } from "@/src/components/ui/input";
import { useGoogleTranslatorMutation } from "@/src/mutation/useGoogleTranslatorMutation";
import { useCustomTranslatorMutation } from "@/src/mutation/useCustomTranslatorMutation";

import { ResultSkeleton } from "./component/ResultSkeleton";
import { Audio } from "./component/Audio";
import { Inputs } from "./popup.types";
import "./popup.css";

const Popup = () => {
  const { register, handleSubmit } = useForm<Inputs>();

  const googleTranslatorMutation = useGoogleTranslatorMutation();
  const customTranslatorMutation = useCustomTranslatorMutation();

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
    <div className="flex flex-col px-2 py-2 bg-orange-100 rounded-md">
      <div className="flex justify-center my-2">
        <h1 className="text-2xl">Translator</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input autoFocus {...register("text")} />
      </form>
      {googleTranslatorMutation.isPending && <ResultSkeleton />}
      {googleTranslatorMutation.data && (
        <div className="flex flex-col mt-2 px-2 py-2 bg-white gap-2">
          <h2 className="text-2xl">
            {googleTranslatorMutation.data.sourceText}
          </h2>
          {customTranslatorMutation.data && (
            <div className="flex gap-10">
              {customTranslatorMutation.data.data.pronunciation.map((item) => (
                <div key={item.lang} className="flex gap-2 items-center">
                  <span className="text-md font-medium">{item.lang}</span>
                  <Audio url={item.url} />
                  <span>[{item.pron}]</span>
                </div>
              ))}
            </div>
          )}
          <div className="flex flex-col mt-2 px-2 py-2 bg-slate-400">
            <h3 className="text-xl">
              {googleTranslatorMutation.data.translatedText}
            </h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default Popup;
