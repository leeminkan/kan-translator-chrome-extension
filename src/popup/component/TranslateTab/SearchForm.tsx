import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { Input } from "@/src/components/ui/input";
import { Inputs } from "../../popup.types";

export const SearchForm = ({
  defaultValues,
  onSubmit,
}: {
  defaultValues?: Partial<Inputs>;
  onSubmit: SubmitHandler<Inputs>;
}) => {
  const { register, handleSubmit } = useForm<Inputs>({
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        autoFocus
        {...register("text")}
        placeholder="Enter text to translate..."
      />
    </form>
  );
};
