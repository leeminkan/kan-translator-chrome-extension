export const eventAction = {
  PLAY_SOUND: "PLAY_SOUND",
} as const;
type EventAction = keyof typeof eventAction;

export type PlaySoundMessagePayload = {
  action: EventAction;
  data: {
    url: string;
  };
};

export type PlaySoundEventResult = {
  result: "success" | "error";
  error?: Error;
};

export type MessagePayload = PlaySoundMessagePayload;
