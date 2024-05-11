import React from "react";
import { Minus } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/src/components/ui/tooltip";
import { Button, ButtonProps } from "@/src/components/ui/button";

export function RemoveButtonIcon(props: ButtonProps) {
  return (
    <TooltipProvider delayDuration={0} disableHoverableContent={true}>
      <Tooltip>
        <TooltipTrigger asChild={true}>
          <Button variant="ghost" size="sm-icon" {...props}>
            <Minus className="h-4 w-4 bg-red-100" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom" hideWhenDetached={true}>
          Remove from Word Bank
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
