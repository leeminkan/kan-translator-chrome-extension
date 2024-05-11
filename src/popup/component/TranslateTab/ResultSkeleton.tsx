import React from "react";
import { Skeleton } from "@/src/components/ui/skeleton";

export function ResultSkeleton() {
  return (
    <div className="flex flex-col mt-2 px-2 py-2 bg-white gap-2">
      <Skeleton className="h-6 w-[300px]" />
      <Skeleton className="h-6 w-[350px]" />
      <Skeleton className="h-6 w-[350px]" />
    </div>
  );
}
