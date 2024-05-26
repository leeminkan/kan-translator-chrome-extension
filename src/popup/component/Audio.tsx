import React, { useState } from "react";

import { AudioIcon } from "@/src/components/icons/audio-icon";
import { AudioFilledIcon } from "@/src/components/icons/audio-filled-icon";

import {
  eventAction,
  PlaySoundMessagePayload,
  PlaySoundEventResult,
} from "@/src/offscreen/type";

export const Audio = ({ url }: { url: string }) => {
  const [playingInOffscreen, setPlayingInOffscreen] = useState(false);

  const playInOffscreen = async () => {
    if (playingInOffscreen) return;

    setPlayingInOffscreen(true);
    return chrome.runtime
      .sendMessage({
        action: eventAction.PLAY_SOUND,
        data: { url },
      } as PlaySoundMessagePayload)
      .then((res: PlaySoundEventResult) => {
        setPlayingInOffscreen(false);
        if (res.result === "error") {
          console.error(res.error);
        }
      });
  };

  return (
    <div className="w-4 h-4 hover:cursor-pointer" onClick={playInOffscreen}>
      {playingInOffscreen ? <AudioFilledIcon /> : <AudioIcon />}
    </div>
  );
};
