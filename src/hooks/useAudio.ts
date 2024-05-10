import React, { useCallback, useEffect, useRef, useState } from "react";

export function useAudio(url: string) {
  const audioRef = useRef(new Audio(url));
  const [playing, setPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(1);

  const pausePlaying = useCallback(() => {
    setPlaying(false);
    try {
      audioRef.current?.pause();
    } catch (e) {
      console.error("Cannot pause audio", e);
    }
  }, [audioRef]);

  /**
   * Use Start Playing inside a click event
   * This will allow the audio file to be played from the browsers
   */
  const startPlaying = useCallback(() => {
    setPlaying(true);
    try {
      if (audioRef.current) {
        audioRef.current.src = url;
        audioRef.current.play();
      }
    } catch (e) {
      console.error("Cannot play audio", e);
    }
  }, [url]);

  useEffect(() => {
    if (audioRef.current)
      audioRef.current.addEventListener("ended", pausePlaying);
    return () => {
      if (audioRef.current)
        audioRef.current.removeEventListener("ended", pausePlaying);
    };
  }, [audioRef, pausePlaying]);

  useEffect(() => {
    return () => {
      pausePlaying();
    };
  }, [pausePlaying]);

  return {
    playing,
    volume,
    setVolume,
    play: startPlaying,
    pause: pausePlaying,
  };
}
