document.addEventListener("DOMContentLoaded", () => {
  const saveCurrentTabButton = document.getElementById("save-current-tab");
  const bookmarksList = document.getElementById("bookmarks-list");
  const emptyState = document.getElementById("empty-state");
  const searchInput = document.getElementById("search-input");
  const openDashboardButton = document.getElementById("open-dashboard");

  loadBookmarks();

  openDashboardButton.addEventListener("click", () => {
    chrome.tabs.create({ url: "dashboard/dashboard.html" });
  });
  saveCurrentTabButton.addEventListener("click", handleSave);
  searchInput.addEventListener("input", handleSearch);

  function loadBookmarks() {
    chrome.storage.sync.get("bookmarks", (result) => {
      let bookmarks = result.bookmarks || [];
      let needsUpdate = false;
      bookmarks = bookmarks.map(b => {
        if (!b.id) {
          needsUpdate = true;
          return {
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            title: b.title,
            url: b.url,
            tags: b.tags || [],
            note: b.note || "",
            createdAt: b.createdAt || new Date().toISOString()
          };
        }
        return b;
      });

      if (needsUpdate) {
        chrome.storage.sync.set({ bookmarks });
      }
      
      updateUI(bookmarks);
    });
  }

  function handleSave() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      const isChatGPT = activeTab.url.includes("chatgpt.com") || activeTab.url.includes("chat.openai.com");

      if (!isChatGPT) {
        alert("Only ChatGPT pages can be bookmarked.");
        return;
      }

      chrome.storage.sync.get("bookmarks", (result) => {
        const bookmarks = result.bookmarks || [];
        const alreadyExists = bookmarks.some((b) => b.url === activeTab.url);

        if (alreadyExists) {
          alert("This bookmark already exists.");
          return;
        }

        const bookmark = {
          id: Date.now().toString(),
          title: activeTab.title,
          url: activeTab.url,
          tags: [],
          note: "",
          createdAt: new Date().toISOString()
        };
        
        bookmarks.push(bookmark);
        chrome.storage.sync.set({ bookmarks }, () => updateUI(bookmarks));
      });
    });
  }

  function handleSearch(e) {
    const query = e.target.value.toLowerCase();
    chrome.storage.sync.get("bookmarks", (result) => {
      const bookmarks = result.bookmarks || [];
      const filtered = bookmarks.filter((b) =>
        b.title.toLowerCase().includes(query) ||
        (b.tags && b.tags.some(t => t.toLowerCase().includes(query))) ||
        (b.note && b.note.toLowerCase().includes(query))
      );
      updateUI(filtered);
    });
  }

  function updateUI(bookmarks) {
    bookmarksList.innerHTML = "";

    if (bookmarks.length === 0) {
      emptyState.style.display = "flex";
      return;
    }

    emptyState.style.display = "none";

    bookmarks.forEach((bookmark) => {
      const item = document.createElement("div");
      item.className = "bookmark-item";
      item.dataset.id = bookmark.id;

      const viewMode = document.createElement("div");
      viewMode.className = "view-mode";
      
      const contentDiv = document.createElement("div");
      contentDiv.className = "bookmark-content";
      
      const title = document.createElement("div");
      title.className = "bookmark-title";
      title.textContent = bookmark.title;
      
      const metaDiv = document.createElement("div");
      metaDiv.className = "bookmark-meta";
      
      if (bookmark.tags && bookmark.tags.length > 0) {
          const tagsSpan = document.createElement("span");
          tagsSpan.className = "tags-list";
          bookmark.tags.forEach(tag => {
              const tagEl = document.createElement("span");
              tagEl.className = "tag";
              tagEl.textContent = tag;
              tagsSpan.appendChild(tagEl);
          });
          metaDiv.appendChild(tagsSpan);
      }

      contentDiv.appendChild(title);
      contentDiv.appendChild(metaDiv);

      const actionsDiv = document.createElement("div");
      actionsDiv.className = "bookmark-actions";

      const editBtn = document.createElement("button");
      editBtn.className = "action-btn edit-btn";
      editBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>`;
      
      const deleteBtn = document.createElement("button");
      deleteBtn.className = "action-btn delete-btn";
      deleteBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>`;

      actionsDiv.appendChild(editBtn);
      actionsDiv.appendChild(deleteBtn);

      viewMode.appendChild(contentDiv);
      viewMode.appendChild(actionsDiv);

      const editMode = document.createElement("div");
      editMode.className = "edit-mode hidden";
      editMode.innerHTML = `
        <input type="text" class="edit-title" value="${bookmark.title.replace(/"/g, '&quot;')}" placeholder="Title">
        <input type="text" class="edit-tags" value="${(bookmark.tags || []).join(", ")}" placeholder="Tags (comma separated)">
        <textarea class="edit-note" placeholder="Add a note...">${bookmark.note || ""}</textarea>
        <div class="edit-actions">
            <button class="save-edit-btn">Save</button>
            <button class="cancel-edit-btn">Cancel</button>
        </div>
      `;

      item.appendChild(viewMode);
      item.appendChild(editMode);

      contentDiv.addEventListener("click", () => {
        chrome.tabs.create({ url: bookmark.url });
      });

      deleteBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        if(confirm("Delete this bookmark?")) {
            deleteBookmark(bookmark.id);
        }
      });

      editBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        viewMode.classList.add("hidden");
        editMode.classList.remove("hidden");
      });

      const saveEditBtn = editMode.querySelector(".save-edit-btn");
      const cancelEditBtn = editMode.querySelector(".cancel-edit-btn");

      saveEditBtn.addEventListener("click", () => {
        const newTitle = editMode.querySelector(".edit-title").value;
        const newTags = editMode.querySelector(".edit-tags").value.split(",").map(t => t.trim()).filter(t => t);
        const newNote = editMode.querySelector(".edit-note").value;
        
        updateBookmark(bookmark.id, { title: newTitle, tags: newTags, note: newNote });
      });

      cancelEditBtn.addEventListener("click", () => {
        viewMode.classList.remove("hidden");
        editMode.classList.add("hidden");
      });

      bookmarksList.appendChild(item);
    });
  }

  function deleteBookmark(id) {
    chrome.storage.sync.get("bookmarks", (result) => {
        const bookmarks = result.bookmarks || [];
        const newBookmarks = bookmarks.filter(b => b.id !== id);
        chrome.storage.sync.set({ bookmarks: newBookmarks }, () => updateUI(newBookmarks));
    });
  }

  function updateBookmark(id, updates) {
    chrome.storage.sync.get("bookmarks", (result) => {
        const bookmarks = result.bookmarks || [];
        const index = bookmarks.findIndex(b => b.id === id);
        if (index !== -1) {
            bookmarks[index] = { ...bookmarks[index], ...updates };
            chrome.storage.sync.set({ bookmarks }, () => updateUI(bookmarks));
        }
    });
  }
});