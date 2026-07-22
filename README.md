# SCADA Screen Monitoring

A front-end-only UI mockup for monitoring SCADA screens. Built for client demos — there is no backend, real authentication, video streaming, or database. All data is hardcoded in the front-end.

## Tech Stack

- **React 19** + **TypeScript**, scaffolded with **Vite**
- **Tailwind CSS** for styling
- **React Router** for routing (`/login`, `/dashboard`)
- **React Context** for in-memory mock login state (no localStorage, no cookies)

## Prerequisites

Install **Node.js 18 or later** (Node 20+ recommended). npm is included with Node.js.

| Platform | How to install |
|----------|----------------|
| **Windows** | Download the LTS installer from [nodejs.org](https://nodejs.org/) and run it. Restart your terminal after install. |
| **macOS** | Download from [nodejs.org](https://nodejs.org/), or run `brew install node` if you use Homebrew. |
| **Linux** | Use your package manager, e.g. `sudo apt install nodejs npm` (Debian/Ubuntu) or [nvm](https://github.com/nvm-sh/nvm) for version management. |

Verify installation:

```bash
node --version
npm --version
```

Both commands should print a version number.

## Getting Started

### 1. Get the project

Clone or copy the project folder, then open a terminal in the project root (`scada-screens-project/`).

### 2. Install dependencies

Run once after cloning or when `package.json` changes:

**Windows (Command Prompt or PowerShell):**
```cmd
npm install
```

**macOS / Linux (Terminal):**
```bash
npm install
```

### 3. Start the development server

**Windows:**
```cmd
npm run dev
```

**macOS / Linux:**
```bash
npm run dev
```

Open the URL shown in the terminal (usually **http://localhost:5173/**) in a desktop browser. The app is optimized for desktop width.

Press `Ctrl+C` in the terminal to stop the server.

## Demo Login Credentials

| Email | Password | Role | SCADA Access |
|-------|----------|------|--------------|
| `Vijayakumar@orchidpharma` | `1234` | Admin | All 8 screens |
| `operator@orchidpharma` | `1234` | Operator | SCADA 1, 2, 3 only |

Credentials are defined in `src/mockData/users.ts`. Login is case-sensitive.

## Production Build

Build static files for deployment:

```bash
npm run build
```

Output is written to the `dist/` folder.

Preview the production build locally:

```bash
npm run preview
```

Then open the URL shown (usually **http://localhost:4173/**).

## Project Structure

```
scada-screens-project/
├── public/
│   ├── LOGO.jpg                 # Client logo (drop-in replacement)
│   └── mock-screens/            # SCADA screen images (drop-in replacements)
├── src/
│   ├── mockData/
│   │   ├── users.ts             # Mock users and SCADA access
│   │   └── scadas.ts            # SCADA screen list and image paths
│   ├── context/
│   │   └── AuthContext.tsx      # In-memory login state
│   ├── pages/
│   │   ├── LoginPage.tsx
│   │   └── DashboardPage.tsx
│   ├── components/
│   │   ├── SettingsMenu.tsx
│   │   ├── Modal.tsx
│   │   └── settings/            # Settings modals (UI skeletons)
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── vite.config.ts
└── package.json
```

## Replacing Logo and SCADA Images

No code changes are needed to swap in real assets — replace files in `public/` and keep the same filenames (or update paths in `src/mockData/scadas.ts` if filenames change).

| Asset | Location |
|-------|----------|
| Company logo | `public/LOGO.jpg` |
| SCADA 1 | `public/mock-screens/scada1.gif` |
| SCADA 2 | `public/mock-screens/scada2.jpg` |
| SCADA 3 | `public/mock-screens/scada3.avif` |
| SCADA 4 | `public/mock-screens/scada9.png` |
| SCADA 5 | `public/mock-screens/scada10.webp` |
| SCADA 6 | `public/mock-screens/scada6.png` |
| SCADA 7 | `public/mock-screens/scada7.png` |
| SCADA 8 | `public/mock-screens/scada8.jpg` |

Image paths are configured in `src/mockData/scadas.ts`.

## Customizing Mock Data

**Users** — edit `src/mockData/users.ts`:
- Add or change users, roles, passwords, and `allowedScadas` arrays.

**SCADA screens** — edit `src/mockData/scadas.ts`:
- Add or change screen `id`, `name`, and `image` path.

After editing mock data, save the file; the dev server will hot-reload automatically.

## App Features (Mock / UI Only)

| Feature | Behavior |
|---------|----------|
| Login | Validates against hardcoded users; shows error on failure |
| Dashboard | Shows SCADA dropdown filtered by user access; displays static image |
| Settings menu | Gear icon opens User Config, SCADA Config, Resolution (per screen), General Settings |
| Session | In-memory only — refreshing the page returns you to login |
| Settings forms | UI skeletons; Save/Submit logs to browser console, does not persist |

## Troubleshooting

### `npm` is not recognized (Windows)

Node.js may not be on your PATH. Reinstall Node.js from [nodejs.org](https://nodejs.org/) and check **"Add to PATH"**, then restart Command Prompt or PowerShell.

### `command not found: npm` (macOS / Linux)

Install Node.js or ensure your shell loads nvm/Homebrew paths. Try opening a new terminal window.

### Port already in use

If port 5173 is busy, Vite will try the next available port. Check the terminal output for the correct URL, or stop the other process using that port.

### Permission errors on Linux

Avoid `sudo npm install`. Fix npm global directory permissions or use nvm so packages install in your user directory.

### Blank page after build

Ensure you deploy the contents of `dist/` and serve it with a server that supports SPA routing, or configure your host to fall back to `index.html` for `/login` and `/dashboard`.

## Explicitly Out of Scope

This mockup does **not** include:

- Backend, API, or database
- Real authentication or password hashing
- Video or live streaming
- Persistence across page refresh
- Functional settings (changes are cosmetic only)

## License

Private — for Orchid Pharma client demo use.
