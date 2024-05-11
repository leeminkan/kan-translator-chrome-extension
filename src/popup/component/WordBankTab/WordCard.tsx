import React from "react";
import { useQueryClient } from "@tanstack/react-query";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { wordBankStorage } from "@/src/services/wordBankStorage";

import { RemoveButtonIcon } from "./RemoveButtonIcon";

export function WordCard({
  sourceText,
  translatedTextList,
}: {
  sourceText: string;
  translatedTextList: string[];
}) {
  const queryClient = useQueryClient();
  return (
    <Card>
      <CardHeader className="relative">
        <CardTitle>{sourceText}</CardTitle>
        <CardDescription>{translatedTextList.join(", ")}</CardDescription>
        <RemoveButtonIcon
          className="absolute top-0 right-2"
          onClick={async () => {
            await wordBankStorage.removeWord({ sourceText });
            queryClient.invalidateQueries({
              queryKey: [wordBankStorage._key],
            });
          }}
        />
      </CardHeader>
    </Card>
  );
}
