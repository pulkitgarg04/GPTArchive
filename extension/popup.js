document.addEventListener("DOMContentLoaded", () => {
  const bookmarkButton = document.getElementById("bookmark");
  const bookmarksList = document.getElementById("bookmarks");

  chrome.storage.local.get("bookmarks", (result) => {
    const bookmarks = result.bookmarks || [];
    if (bookmarks.length > 0) {
      bookmarksList.innerHTML = "";
      bookmarks.forEach((bookmark) => addBookmarkToList(bookmark));
    }
  });

  bookmarkButton.addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      const title = tab.title;
      const url = tab.url;

      const newBookmark = { title, url };

      chrome.storage.local.get("bookmarks", (result) => {
        const bookmarks = result.bookmarks || [];
        bookmarks.push(newBookmark);
        chrome.storage.local.set({ bookmarks }, () => {
          const placeholder = document.querySelector(".text-gray-500");
          if (placeholder) placeholder.remove();

          addBookmarkToList(newBookmark);
          alert("Chat bookmarked successfully!");
        });
      });
    });
  });

  function addBookmarkToList(bookmark) {
    const li = document.createElement("li");
    li.className =
      "flex justify-between items-center p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition";
    li.innerHTML = `
      <a href="${bookmark.url}" target="_blank" class="text-teal-600 font-medium hover:underline truncate max-w-[220px]">
        ${bookmark.title}
      </a>
      <button class="text-gray-400 hover:text-red-500 delete-bookmark">✖</button>
    `;

    bookmarksList.appendChild(li);

    li.querySelector(".delete-bookmark").addEventListener("click", () => {
      chrome.storage.local.get("bookmarks", (result) => {
        const bookmarks = result.bookmarks || [];
        const updatedBookmarks = bookmarks.filter((b) => b.url !== bookmark.url);
        chrome.storage.local.set({ bookmarks: updatedBookmarks }, () => {
          li.remove();
          if (updatedBookmarks.length === 0) {
            bookmarksList.innerHTML =
              '<li class="text-gray-500 text-sm">No bookmarks yet. Start saving your chats!</li>';
          }
        });
      });
    });
  }
});