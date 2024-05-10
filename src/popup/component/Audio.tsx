import React from "react";

import { useAudio } from "@/src/hooks/useAudio";
import { AudioIcon } from "@/src/components/icons/audio-icon";
import { AudioFilledIcon } from "@/src/components/icons/audio-filled-icon";

export const Audio = ({ url }: { url: string }) => {
  const { play, playing } = useAudio(url);

  return (
    <div className="w-4 h-4 hover:cursor-pointer" onClick={play}>
      {playing ? <AudioFilledIcon /> : <AudioIcon />}
    </div>
  );
};
