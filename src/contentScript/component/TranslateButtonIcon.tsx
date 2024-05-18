import React from "react";
import { Search } from "lucide-react";

import { Button, ButtonProps } from "@/src/components/ui/button";

export function TranslateButtonIcon(props: ButtonProps) {
  return (
    <Button variant="secondary" size="sm-icon" {...props}>
      <Search className="h-4 w-4" />
    </Button>
  );
}
