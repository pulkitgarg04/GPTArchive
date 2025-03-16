document.addEventListener("DOMContentLoaded", () => {
  const saveCurrentTabButton = document.getElementById("save-current-tab");
  const bookmarksList = document.getElementById("bookmarks-list");
  const emptyState = document.getElementById("empty-state");
  const searchInput = document.getElementById("search-input");
  const exportBookmarksButton = document.getElementById("export-bookmarks");

  chrome.storage.local.get("bookmarks", (result) => {
    const bookmarks = result.bookmarks || [];
    updateUI(bookmarks);
  });

  exportBookmarksButton.addEventListener("click", () => {
    chrome.storage.local.get("bookmarks", (result) => {
      const bookmarks = result.bookmarks || [];
      if (bookmarks.length === 0) {
        alert("No bookmarks to export.");
        return;
      }
  
      let csvContent = "Title,URL\n";
      bookmarks.forEach((bookmark) => {
        const title = bookmark.title.replace(/"/g, '""');
        const url = bookmark.url.replace(/"/g, '""');
        csvContent += `"${title}","${url}"\n`;
      });
  
      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
  
      const a = document.createElement("a");
      a.href = url;
      a.download = "bookmarks.csv";
      a.click();
  
      URL.revokeObjectURL(url);
    });
  });

  saveCurrentTabButton.addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      const isChatGPT = activeTab.url.includes("chatgpt.com");

      if (!isChatGPT) {
        alert("Only ChatGPT pages can be bookmarked.");
        return;
      }

      chrome.storage.local.get("bookmarks", (result) => {
        const bookmarks = result.bookmarks || [];
        const alreadyExists = bookmarks.some((b) => b.url === activeTab.url);

        if (alreadyExists) {
          alert("This bookmark already exists.");
          return;
        }

        const bookmark = { title: activeTab.title, url: activeTab.url };
        bookmarks.push(bookmark);

        chrome.storage.local.set({ bookmarks }, () => updateUI(bookmarks));
      });
    });
  });

  function updateUI(bookmarks) {
    bookmarksList.innerHTML = "";

    if (bookmarks.length === 0) {
      emptyState.style.display = "flex";
      return;
    }

    emptyState.style.display = "none";

    bookmarks.forEach((bookmark, index) => {
      const item = document.createElement("div");
      item.className = "bookmark-item";

      const title = document.createElement("div");
      title.className = "bookmark-title";
      title.textContent = bookmark.title;

      const deleteButton = document.createElement("button");
      deleteButton.className = "delete-btn";
      deleteButton.innerHTML = "🗑️";
      deleteButton.addEventListener("click", (event) => {
        event.stopPropagation();
        bookmarks.splice(index, 1);
        chrome.storage.local.set({ bookmarks }, () => updateUI(bookmarks));
      });

      item.appendChild(title);
      item.appendChild(deleteButton);

      item.addEventListener("click", () => {
        chrome.tabs.create({ url: bookmark.url });
      });

      bookmarksList.appendChild(item);
    });
  }

  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    chrome.storage.local.get("bookmarks", (result) => {
      const bookmarks = result.bookmarks || [];
      const filtered = bookmarks.filter((bookmark) =>
        bookmark.title.toLowerCase().includes(query)
      );
      updateUI(filtered);
    });
  });
});