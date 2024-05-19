import React, { useState } from "react";
import { CircleX } from "lucide-react";

import { Button, ButtonProps } from "@/src/components/ui/button";

export function CloseButtonIcon({ ...props }: ButtonProps) {
  const [hover, setHover] = useState(false);

  return (
    <Button
      variant="ghost"
      size="sm-icon"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      {...props}
    >
      <CircleX
        className="h-5 w-5"
        fill="red"
        stroke={hover ? "white" : "red"}
      />
    </Button>
  );
}
