# TallyOne — تطبيق العداد الذكي

A lightweight, offline-capable Progressive Web App (PWA) for tracking and saving counter sessions — built with a focus on Arabic-language UX.

---

## Features

- **Increment / Decrement** — Tap `+` or `−` to change the counter value with satisfying press animations.
- **Configurable Step Size** — Switch between ×1, ×5, and ×10 increments per tap.
- **Session Saving** — Attach a category and an optional description to any count, then save it to your history.
- **Category System** — Six built-in categories: عام, عمل, دراسة, رياضة, عبادات, أهداف (General, Work, Study, Sports, Worship, Goals).
- **Session History** — Browse, review, and delete past sessions. History persists across page reloads via `localStorage`.
- **Dark / Light Theme** — Toggle between themes; preference is saved locally.
- **PWA / Installable** — Includes a Web App Manifest and Service Worker for offline support and home-screen installation on mobile and desktop.
- **Toast Notifications** — Non-intrusive status messages for save, delete, reset, and install actions.

---

## Project Structure

```
├── index.html          # App shell, markup, and Tailwind config
├── main.css            # Custom styles (animations, glow effects, scrollbar, etc.)
├── app.ts              # Application logic (TypeScript source)
├── dist/
│   └── app.js          # Compiled JavaScript (output of tsc)
├── manifest.json       # PWA manifest
├── service-worker.js   # Service Worker for offline caching
└── icons/
    └── icon-192.png    # PWA app icon
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 (RTL, `lang="ar"`) |
| Styling | Tailwind CSS (CDN) + custom CSS |
| Logic | TypeScript (compiled to `dist/app.js`) |
| Fonts | Cairo (UI) + JetBrains Mono (numbers) via Google Fonts |
| Storage | `localStorage` |
| PWA | Web App Manifest + Service Worker |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (for TypeScript compilation)
- TypeScript: `npm install -g typescript`

### Development

1. Clone the repository and navigate to the project folder.
2. Compile the TypeScript source:

```bash
tsc app.ts --outDir dist --target ES2020
```

3. Serve the project with any static file server, for example:

```bash
npx serve .
```

> **Note:** Opening `index.html` directly as a `file://` URL will prevent the Service Worker from registering. A local HTTP server is required for full PWA functionality.

### Build (watch mode)

```bash
tsc app.ts --outDir dist --target ES2020 --watch
```

---

## Usage

1. **Count** — Use the `+` and `−` buttons to increment or decrement. Tap the step selector (×1 / ×5 / ×10) to change how much each press adds.
2. **Label your session** — Pick a category from the pill selector and optionally type a description.
3. **Save** — Press **حفظ الجلسة** to store the current count with its label.
4. **Review history** — Switch to the **السجل** tab to see all saved sessions. Each card shows the category, timestamp, description, and final count. Individual sessions can be deleted, or the entire history can be cleared.
5. **Install** — If your browser supports PWA installation, an **تثبيت** button will appear in the header. Tap it to install TallyOne to your home screen for offline use.

---

## Customization

**Adding categories** — Edit the `categories` array in `app.ts`:

```typescript
const categories = ["عام", "عمل", "دراسة", "رياضة", "عبادات", "أهداف"];
```

**Changing the accent color** — The app uses Indigo (`#6366f1`) as its primary color. Search for `indigo` in `index.html` and `main.css` to update it.

---

## License

MIT