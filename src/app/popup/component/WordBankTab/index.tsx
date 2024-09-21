import * as React from "react";

import { ScrollArea } from "@/src/components/ui/scroll-area";
import { useWordBankList } from "@/src/queries/useWordBankQueries";

import { WordCard } from "./WordCard";

export function WordBankTab() {
  const { data } = useWordBankList();
  return (
    <ScrollArea className="h-72 w-full px-4 pb-2">
      <div className="grid grid-cols-2 items-center gap-2">
        {data &&
          data.map((word) => (
            <WordCard
              key={word.sourceText}
              sourceText={word.sourceText}
              translatedTextList={word.translatedTextList}
            />
          ))}
      </div>
    </ScrollArea>
  );
}
