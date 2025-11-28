# Privacy Policy for GPTArchive

**Last Updated:** November 29, 2025

## 1. Data Collection and Usage
GPTArchive ("we", "our", or "us") respects your privacy. This extension is designed to help you archive and organize your ChatGPT conversations locally and via your browser's sync capabilities.

**We do not collect, store, or transmit your personal data to any external servers.**

## 2. How Your Data is Stored
- **Bookmarks & Metadata:** All bookmarks, tags, and notes are stored using the `chrome.storage.sync` API. This means your data is stored:
  - Locally on your device.
  - Synced across your devices where you are signed into Chrome (encrypted by Google).
- **No External Database:** We do not have a backend server or database. You own your data completely.

## 3. Permissions
The extension requires the following permissions to function:
- **`storage`**: To save your bookmarks and settings.
- **`activeTab`**: To access the title and URL of the current ChatGPT tab when you click "Save".
- **`contextMenus`**: To allow you to save chats via right-click.
- **`scripting`**: To inject necessary scripts for functionality on ChatGPT pages.

## 4. Third-Party Services
This extension interacts with:
- **OpenAI (ChatGPT):** The extension only reads the URL and Title of pages on `chatgpt.com` or `chat.openai.com` when you explicitly trigger a save action. It does not read your chat content automatically.

## 5. Changes to This Policy
We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.

## 6. Contact Us
If you have any questions about this Privacy Policy, please contact us via our GitHub repository.
