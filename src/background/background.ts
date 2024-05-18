// Create context menu option
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "kan-translate-menu",
    title: "Kan Translate",
    contexts: ["selection"],
  });
});

// Respond to translation requests
chrome.contextMenus.onClicked.addListener(async (info, tabs) => {
  chrome.tabs.sendMessage(tabs.id, {});
});
