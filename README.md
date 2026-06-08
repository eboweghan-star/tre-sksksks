# Control Panel

A modern web-based admin control panel built with React, TypeScript, and Vite. Can be run in the browser or packaged as a standalone Windows `.exe`.

## Features

- **Dashboard** — Overview with stats, recent activity, and service status
- **Loader** — Manage and monitor Loader_Prem.exe
- **Users** — User management table with roles and status
- **System** — Resource monitoring and process list
- **Logs** — Application log viewer
- **Settings** — Configurable toggles and preferences

## Run in Browser

```bash
cd control-panel
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Build Windows `.exe`

Builds `ControlPanel.exe` — a standalone app that opens the control panel in your default browser:

```bash
./scripts/build-exe.sh
```

Output:
- **Windows:** `dist/ControlPanel.exe`
- **Linux:** `dist/control-panel`

Double-click `ControlPanel.exe` on Windows. It starts a local server and opens the control panel. Press Enter in the console window to quit.

## Build (web only)

```bash
cd control-panel
npm run build
```

## Tech Stack

- React 19 + TypeScript
- Vite
- React Router
- Go (desktop launcher / `.exe` packaging)
