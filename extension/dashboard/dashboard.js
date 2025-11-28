document.addEventListener("DOMContentLoaded", () => {
  const bookmarksBody = document.getElementById("bookmarks-body");
  const searchInput = document.getElementById("search-input");
  const emptyState = document.getElementById("empty-state");
  const exportBtn = document.getElementById("export-btn");
  const importBtn = document.getElementById("import-btn");
  const importFile = document.getElementById("import-file");
  
  const editModal = document.getElementById("edit-modal");
  const editTitle = document.getElementById("edit-title");
  const editTags = document.getElementById("edit-tags");
  const editNote = document.getElementById("edit-note");
  const saveEditBtn = document.getElementById("save-edit");
  const cancelEditBtn = document.getElementById("cancel-edit");

  let currentEditId = null;

  loadBookmarks();

  searchInput.addEventListener("input", handleSearch);
  exportBtn.addEventListener("click", handleExport);
  importBtn.addEventListener("click", () => importFile.click());
  importFile.addEventListener("change", handleImport);
  
  cancelEditBtn.addEventListener("click", closeModal);
  saveEditBtn.addEventListener("click", saveEdit);

  editModal.addEventListener("click", (e) => {
    if (e.target === editModal) closeModal();
  });

  function loadBookmarks() {
    chrome.storage.sync.get("bookmarks", (result) => {
      const bookmarks = result.bookmarks || [];
      renderTable(bookmarks);
    });
  }

  function renderTable(bookmarks) {
    bookmarksBody.innerHTML = "";
    
    if (bookmarks.length === 0) {
      emptyState.classList.remove("hidden");
      return;
    }
    emptyState.classList.add("hidden");

    bookmarks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    bookmarks.forEach(bookmark => {
      const tr = document.createElement("tr");
      
      const titleTd = document.createElement("td");
      const link = document.createElement("a");
      link.href = bookmark.url;
      link.target = "_blank";
      link.textContent = bookmark.title;
      link.className = "bookmark-link";
      titleTd.appendChild(link);
      
      const tagsTd = document.createElement("td");
      if (bookmark.tags && bookmark.tags.length > 0) {
        const tagsDiv = document.createElement("div");
        tagsDiv.className = "tags-container";
        bookmark.tags.forEach(tag => {
          const span = document.createElement("span");
          span.className = "tag";
          span.textContent = tag;
          tagsDiv.appendChild(span);
        });
        tagsTd.appendChild(tagsDiv);
      }

      const noteTd = document.createElement("td");
      noteTd.className = "note-cell";
      noteTd.textContent = bookmark.note || "";
      noteTd.title = bookmark.note || "";

      const dateTd = document.createElement("td");
      const date = new Date(bookmark.createdAt);
      dateTd.textContent = date.toLocaleDateString();
      dateTd.className = "date-cell";

      const actionsTd = document.createElement("td");
      actionsTd.className = "actions-cell";
      
      const editBtn = document.createElement("button");
      editBtn.className = "icon-btn edit-btn";
      editBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>`;
      editBtn.onclick = () => openEditModal(bookmark);

      const deleteBtn = document.createElement("button");
      deleteBtn.className = "icon-btn delete-btn";
      deleteBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>`;
      deleteBtn.onclick = () => deleteBookmark(bookmark.id);

      actionsTd.appendChild(editBtn);
      actionsTd.appendChild(deleteBtn);

      tr.appendChild(titleTd);
      tr.appendChild(tagsTd);
      tr.appendChild(noteTd);
      tr.appendChild(dateTd);
      tr.appendChild(actionsTd);

      bookmarksBody.appendChild(tr);
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
      renderTable(filtered);
    });
  }

  function deleteBookmark(id) {
    if (!confirm("Are you sure you want to delete this bookmark?")) return;
    
    chrome.storage.sync.get("bookmarks", (result) => {
      const bookmarks = result.bookmarks || [];
      const newBookmarks = bookmarks.filter(b => b.id !== id);
      chrome.storage.sync.set({ bookmarks: newBookmarks }, () => {
        loadBookmarks();
      });
    });
  }

  function openEditModal(bookmark) {
    currentEditId = bookmark.id;
    editTitle.value = bookmark.title;
    editTags.value = (bookmark.tags || []).join(", ");
    editNote.value = bookmark.note || "";
    editModal.classList.remove("hidden");
  }

  function closeModal() {
    editModal.classList.add("hidden");
    currentEditId = null;
  }

  function saveEdit() {
    if (!currentEditId) return;

    const newTitle = editTitle.value;
    const newTags = editTags.value.split(",").map(t => t.trim()).filter(t => t);
    const newNote = editNote.value;

    chrome.storage.sync.get("bookmarks", (result) => {
      const bookmarks = result.bookmarks || [];
      const index = bookmarks.findIndex(b => b.id === currentEditId);
      if (index !== -1) {
        bookmarks[index] = { 
          ...bookmarks[index], 
          title: newTitle, 
          tags: newTags, 
          note: newNote 
        };
        chrome.storage.sync.set({ bookmarks }, () => {
          closeModal();
          loadBookmarks();
        });
      }
    });
  }

  function handleExport() {
    chrome.storage.sync.get("bookmarks", (result) => {
      const bookmarks = result.bookmarks || [];
      if (bookmarks.length === 0) {
        alert("No bookmarks to export.");
        return;
      }
  
      let csvContent = "ID,Title,URL,Tags,Note,CreatedAt\n";
      bookmarks.forEach((b) => {
        const title = (b.title || "").replace(/"/g, '""');
        const url = (b.url || "").replace(/"/g, '""');
        const tags = (b.tags || []).join(";").replace(/"/g, '""');
        const note = (b.note || "").replace(/"/g, '""');
        csvContent += `"${b.id}","${title}","${url}","${tags}","${note}","${b.createdAt}"\n`;
      });
  
      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "gptarchive_bookmarks.csv";
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  function handleImport(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const lines = text.split("\n");
      
      const parseCSVLine = (line) => {
        const result = [];
        let start = 0;
        let inQuotes = false;
        for (let i = 0; i < line.length; i++) {
            if (line[i] === '"') {
                inQuotes = !inQuotes;
            } else if (line[i] === ',' && !inQuotes) {
                let field = line.substring(start, i);
                if (field.startsWith('"') && field.endsWith('"')) {
                    field = field.substring(1, field.length - 1).replace(/""/g, '"');
                }
                result.push(field);
                start = i + 1;
            }
        }
        let lastField = line.substring(start);
        if (lastField.startsWith('"') && lastField.endsWith('"')) {
            lastField = lastField.substring(1, lastField.length - 1).replace(/""/g, '"');
        }
        result.push(lastField);
        return result;
      };

      chrome.storage.sync.get("bookmarks", (result) => {
        const currentBookmarks = result.bookmarks || [];
        let addedCount = 0;

        for (let i = 1; i < lines.length; i++) {
            if (!lines[i].trim()) continue;
            const cols = parseCSVLine(lines[i]);
            
            let bookmark;
            if (cols.length >= 6) {
                bookmark = {
                    id: cols[0] || Date.now().toString(),
                    title: cols[1],
                    url: cols[2],
                    tags: cols[3] ? cols[3].split(";") : [],
                    note: cols[4],
                    createdAt: cols[5]
                };
            } else if (cols.length >= 2) {
                bookmark = {
                    id: Date.now().toString() + Math.random(),
                    title: cols[0],
                    url: cols[1],
                    tags: [],
                    note: "",
                    createdAt: new Date().toISOString()
                };
            }

            if (bookmark && !currentBookmarks.some(b => b.url === bookmark.url)) {
                currentBookmarks.push(bookmark);
                addedCount++;
            }
        }
        
        chrome.storage.sync.set({ bookmarks: currentBookmarks }, () => {
            loadBookmarks();
            alert(`Import successful! Added ${addedCount} bookmarks.`);
        });
      });
    };
    
    reader.readAsText(file);
    event.target.value = ""; 
  }
});
