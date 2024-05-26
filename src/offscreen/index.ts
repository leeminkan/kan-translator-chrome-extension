import { MessagePayload, eventAction, PlaySoundEventResult } from "./type";
import { playAudioFromUrl } from "./player";

chrome.runtime.onMessage.addListener(
  ({ action, data }: MessagePayload, _sender, sendResponse) => {
    switch (action) {
      case eventAction.PLAY_SOUND: {
        playAudioFromUrl(data.url)
          .then(() => {
            sendResponse({
              result: "success",
            } as PlaySoundEventResult);
          })
          .catch((error) => {
            sendResponse({
              result: "error",
              error,
            } as PlaySoundEventResult);
          });
        return true; // keep the messaging channel open for sendResponse
      }
      default:
        return false;
    }
  }
);
