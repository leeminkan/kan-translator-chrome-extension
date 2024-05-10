import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { Input } from "@/src/components/ui/input";
import { useTranslatorMutation } from "@/src/mutation/useTranslatorMutation";

import { ResultSkeleton } from "./component/ResultSkeleton";
import { Inputs } from "./popup.types";
import "./popup.css";

const Popup = () => {
  const { register, handleSubmit } = useForm<Inputs>();

  const { mutateAsync, data, isPending } = useTranslatorMutation();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    return mutateAsync({
      sourceText: data.text,
    });
  };

  return (
    <div className="flex flex-col px-2 py-2 bg-orange-100 rounded-md">
      <div className="flex justify-center my-2">
        <h1 className="text-2xl">Translator</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input autoFocus {...register("text")} />
      </form>
      {isPending && <ResultSkeleton />}
      {data && (
        <div className="flex flex-col mt-2 px-2 py-2 bg-white">
          <h2 className="text-2xl">{data.sourceText}</h2>
          <h3 className="text-xl">... (update later)</h3>
          <div className="flex flex-col mt-2 px-2 py-2 bg-slate-400">
            <h3 className="text-xl">{data.translatedText}</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default Popup;
