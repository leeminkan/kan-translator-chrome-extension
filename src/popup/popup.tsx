import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { Input } from "@/src/components/ui/input";
import { googleTranslator } from "@/src/services/googleTranslator";

import {
  INTERFACE_LANGUAGE_CODE,
  SOURCE_LANGUAGE_CODE,
  TARGET_LANGUAGE_CODE,
} from "./constant";
import { Inputs, Result } from "./popup.types";
import "./popup.css";

const Popup = () => {
  const [result, setResult] = useState<Result>(null);

  const { register, handleSubmit, watch } = useForm<Inputs>();
  const text = watch("text");

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const result = await googleTranslator.translateAsync(
      data.text,
      SOURCE_LANGUAGE_CODE,
      TARGET_LANGUAGE_CODE,
      INTERFACE_LANGUAGE_CODE,
      { translation: true, dictionary: true }
    );
    setResult(result);
  };

  return (
    <div className="flex flex-col px-2 py-2 bg-orange-100">
      <div className="flex justify-center my-2">
        <h1 className="text-2xl">Translator</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input autoFocus {...register("text")} />
      </form>
      {result && (
        <div className="flex flex-col mt-2 px-2 py-2 bg-white">
          <h2 className="text-2xl">{text}</h2>
          <h3 className="text-xl">... (update later)</h3>
          <div className="flex flex-col mt-2 px-2 py-2 bg-slate-400">
            <h3 className="text-xl">{result.translatedText}</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default Popup;
