# Weather Forecast PWA

A production-quality progressive web application built with React and Vite. The app detects your location, fetches real-time weather data using the OpenWeather API, and provides a beautiful interface with dark/light themes, temperature unit toggling, and offline support.

## Features
- 🧭 Smart location detection with permission prompt shown immediately after intro. A banner guides users to allow location (with manual retry) and falls back to search if denied
- 🧪 Modern splash/intro screen with app name & tagline
- 🔍 City search with debounced input and clear error messaging
- 🌡️ Temperature unit switch (°C/°F) with persistence
- 🌗 Dark / Light theme toggling with smooth transitions
- 🌈 Dynamic animated background based on weather conditions
- 📱 Responsive UI with glassmorphism cards and micro‑animations
- 🛠️ Custom `useWeather` hook and context API usage
- ⚡ Performance optimized and minimal re-renders
- 📦 Progressive Web App (installable, offline fallback)
- 📈 SEO enhancements: dynamic titles and meta description

## Folder Structure
```
src/
  components/
  context/
  hooks/
  services/
  utils/
  styles/
public/
  manifest.json
  sw.js
  offline.html
```

## Setup
1. Clone the repository.
2. Create a `.env` file in the project root with your OpenWeather API key:
   ```
   VITE_WEATHER_API_KEY=your_key_here
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## Production Build & Deployment
1. Build the app:
   ```bash
   npm run build
   ```
2. Preview the production build locally (optional):
   ```bash
   npm run preview
   ```

### Deploying to GitHub Pages
1. **Create a GitHub repository** and push your local project:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<your-github-username>/<repo-name>.git
   git push -u origin main
   ```

2. **Update `package.json`**:
   - Replace `<your-github-username>` and `<repo-name>` in the `homepage` field.
   - Run `npm install` to pull in the new `gh-pages` dependency.

3. **Configure `vite.config.js`**:
   - Set `base: '/<repo-name>/'` so that asset paths work correctly on Pages.

4. **Build and deploy**:
   ```bash
   npm run deploy
   ```
   The `gh-pages` script will build the app and push the `dist` output to the
   `gh-pages` branch of your repository. GitHub will serve it at
   `https://<your-github-username>.github.io/<repo-name>/`.

5. **Verify** by visiting the URL in a browser. You can re-run `npm run deploy`
   anytime you make changes.

> Alternatively, you can use a GitHub Actions workflow (e.g. `actions-gh-pages`) if
> you prefer automated continuous deployment.

### Deploying to Vercel
1. Create a Vercel account and install the [Vercel CLI](https://vercel.com/docs/cli).
2. Run `vercel` in the project root and follow prompts.
3. Configure environment variables in Vercel dashboard (`VITE_WEATHER_API_KEY`).
4. Ensure HTTPS is enabled (Vercel provides it by default).

### Enabling HTTPS
- On Vercel, HTTPS is automatic.
- For custom hosts, serve the `dist` folder behind an HTTPS-capable server or CDN.

### Testing PWA Install
1. Open the deployed site in Chrome or any browser supporting PWAs.
2. Look for the `+ Install` icon in the address bar or open developer tools → `Application` → `Manifest` to verify.
3. Test offline behavior by disconnecting from the network and reloading; the offline page should appear.
4. Run Lighthouse audit for Performance, PWA, and Accessibility scores.

## Notes & Tips
- Customize icons (`public/pwa-icon-192.png`, `public/pwa-icon-512.png`).
- Extend service worker `sw.js` or use Workbox for more advanced caching strategies.
- The animated background and particles are pure CSS; you can replace with Canvas or GIFs.

## Converting to a Mobile App
The project is already a Progressive Web App (PWA). It **can be installed** straight from any HTTPS host (or `localhost` during development) and will behave like a native app on phones and tablets.

If you want to wrap it in a native container, follow these steps (using [Capacitor](https://capacitorjs.com/)):

1. Build the web app:
   ```bash
   npm run build
   ```

2. Install Capacitor dependencies:
   ```bash
   npm install @capacitor/core @capacitor/cli
   ```

3. Initialize Capacitor in your project root:
   ```bash
   npx cap init
   # choose a package id (e.g. com.yourdomain.weatherapp) and the app name
   ```

   This generates a `capacitor.config.json` (example already checked into repo) pointing `webDir` at `dist`.

4. Add the platforms you need:
   ```bash
   npx cap add android
   npx cap add ios
   ```

5. After each web build, sync assets to the native projects:
   ```bash
   npm run build
   npx cap copy
   npx cap open android   # or ios
   ```

6. Open the native project in Android Studio / Xcode, configure permissions (geolocation), and run on a device or emulator. The PWA manifest will be used for app icons, splash screen etc.

> **Alternative:** If you don’t need a native wrapper, simply deploy the `dist` folder to a secure host (Vercel/Netlify/Azure/...), and users can "Add to Home screen" from the browser. That alone makes it function as an installable app.

This repository already includes a sample `capacitor.config.json` for reference. Hosting beforehand isn’t strictly necessary, but a live HTTPS URL makes testing the install experience easier.

This app is designed to be portfolio-ready, modular, and easy to extend. Feel free to fork and build upon it!
