import React from "react";
import { Plus } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/src/components/ui/tooltip";
import { Button, ButtonProps } from "@/src/components/ui/button";

export function AddButtonIcon(props: ButtonProps) {
  return (
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
