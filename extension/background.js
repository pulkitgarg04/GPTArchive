chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "save-chat-to-archive",
    title: "Save to GPTArchive",
    contexts: ["page"],
    documentUrlPatterns: ["https://chatgpt.com/*", "https://chat.openai.com/*"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "save-chat-to-archive") {
    saveBookmark(tab);
  }
});

chrome.commands.onCommand.addListener((command) => {
  if (command === "save_chat") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        saveBookmark(tabs[0]);
      }
    });
  }
});

function saveBookmark(tab) {
  if (!tab.url.includes("chatgpt.com") && !tab.url.includes("chat.openai.com")) {
    return;
  }

  chrome.storage.sync.get("bookmarks", (result) => {
    const bookmarks = result.bookmarks || [];
    const alreadyExists = bookmarks.some((b) => b.url === tab.url);

    if (alreadyExists) {
      chrome.action.setBadgeText({ text: "!", tabId: tab.id });
      setTimeout(() => chrome.action.setBadgeText({ text: "", tabId: tab.id }), 2000);
      return;
    }

    const bookmark = {
      id: Date.now().toString(),
      title: tab.title,
      url: tab.url,
      tags: [],
      note: "",
      createdAt: new Date().toISOString()
    };
    
    bookmarks.push(bookmark);

    chrome.storage.sync.set({ bookmarks }, () => {
      chrome.action.setBadgeText({ text: "✓", tabId: tab.id });
      setTimeout(() => chrome.action.setBadgeText({ text: "", tabId: tab.id }), 2000);
    });
  });
}
