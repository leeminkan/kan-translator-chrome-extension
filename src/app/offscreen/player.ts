export const playAudioFromUrl = async (url: string) => {
  return new Promise((resolve, reject) => {
    if (!url) reject("No url provided");

    let audioElement = new Audio();
    audioElement.src = url;

    audioElement.onloadedmetadata = function () {
      audioElement
        .play()
        .catch((e) => reject(`Error while trying to play audio: ${e}`));
    };

    audioElement.onerror = function () {
      reject(`Error loading audio source: ${url}`);
    };

    audioElement.onended = function () {
      resolve(`Finished playing`);
    };
  });
};
