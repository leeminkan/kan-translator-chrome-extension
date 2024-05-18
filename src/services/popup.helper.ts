export const getTextSelection = async () => {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });
  let result = null;
  try {
    [{ result }] = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => window.getSelection().toString(),
    });
  } catch (e) {
    // ignoring an unsupported page like chrome://extensions
  } finally {
    return result as string;
  }
};
