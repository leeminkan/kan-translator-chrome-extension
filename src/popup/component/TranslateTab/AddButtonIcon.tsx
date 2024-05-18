import React from "react";
import { Plus, BookmarkCheck } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/src/components/ui/tooltip";
import { Button, ButtonProps } from "@/src/components/ui/button";

export function AddButtonIcon({
  isSaved,
  ...props
}: ButtonProps & {
  isSaved?: boolean;
}) {
  return isSaved ? (
    <TooltipProvider delayDuration={0} disableHoverableContent={true}>
      <Tooltip>
        <TooltipTrigger asChild={true}>
          <BookmarkCheck className="h-4 w-4" />
        </TooltipTrigger>
        <TooltipContent side="left" hideWhenDetached={true}>
          Saved
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : (
    <TooltipProvider delayDuration={0} disableHoverableContent={true}>
      <Tooltip>
        <TooltipTrigger asChild={true}>
          <Button variant="ghost" size="icon" {...props}>
            <Plus className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left" hideWhenDetached={true}>
          Add to Word Bank
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
