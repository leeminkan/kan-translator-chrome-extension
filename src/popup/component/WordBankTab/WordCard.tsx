import React from "react";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { useWordBank } from "@/src/hooks/useWordBank";

import { RemoveButtonIcon } from "./RemoveButtonIcon";

export function WordCard({
  sourceText,
  translatedTextList,
}: {
  sourceText: string;
  translatedTextList: string[];
}) {
  const { removeWord } = useWordBank();
  return (
    <Card>
      <CardHeader className="relative">
        <CardTitle>{sourceText}</CardTitle>
        <CardDescription>{translatedTextList.join(", ")}</CardDescription>
        <RemoveButtonIcon
          className="absolute top-0 right-2"
          onClick={() => {
            removeWord({ sourceText });
          }}
        />
      </CardHeader>
    </Card>
  );
}
