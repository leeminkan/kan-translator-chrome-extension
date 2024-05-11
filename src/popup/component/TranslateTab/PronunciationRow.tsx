import React from "react";

import { Skeleton } from "@/src/components/ui/skeleton";
import { Pronunciation } from "@/src/services/customTranslator.type";
import { Audio } from "../Audio";

function PronunciationSkeleton() {
  return <Skeleton className="h-6 w-[300px]" />;
}

export const PronunciationRow = ({
  pronunciation,
  isLoading,
}: {
  pronunciation?: Pronunciation[];
  isLoading: boolean;
}) => {
  // If there is no result
  if (!isLoading && !pronunciation) return null;

  return (
    <div className="flex gap-10 h-8 items-center">
      {isLoading ? (
        <PronunciationSkeleton />
      ) : (
        pronunciation.map((item) => (
          <div key={item.lang} className="flex gap-2 items-center">
            <span className="text-md font-medium">{item.lang}</span>
            <Audio url={item.url} />
            <span>[{item.pron}]</span>
          </div>
        ))
      )}
    </div>
  );
};
