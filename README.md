# NegomboGO — Local Tour & Travel Web Guide

**NegomboGO** is a responsive, mobile-first single-page web application designed for tourists navigating the coastal city of **Negombo, Sri Lanka**. This application was built to fulfill the criteria of **Track B (Local Tour & Travel Web Guide)** of the Mobile Web Application course.

---

## 🚀 Key Features

* **Mobile-First Glassmorphism UI**: Built with HTML5, Vanilla CSS3, and ES6+ React, optimized for smartphone viewports (e.g. iPhone SE, iPhone 12 Pro, Pixel 5).
* **SPA Routing**: Leverages `react-router-dom` for dynamic URL routing (`/`, `/favorites`, `/profile`, `/attraction/:id`) with zero page reloads.
* **HTML5 Geolocation Integration**: Calculates real-time distance in kilometers or miles from the traveler's GPS location to the destinations using the mathematical **Haversine formula**. Supports mock/simulated location overrides.
* **Asynchronous Weather Feed**: Connects to the **Open-Meteo REST API** to load real-time temperature conditions at each attraction dynamically upon details mount.
* **Traveler Preferences Form**: Features strict client-side validation (minimum name length rules, character sanitization) and toggling of measurement units (metric/imperial) with state persisted via **`localStorage`**.
* **Navigation Deep-Linking**: Connects button triggers directly to Google Maps coordinates (`https://www.google.com/maps/search/?api=1&query={lat},{lng}`) to initiate native navigation.

---

## 🛠️ Technology Stack

* **Core Framework**: React (Vite Bundler)
* **Routing**: React Router (`react-router-dom`)
* **Styling**: Premium Vanilla CSS (custom variables, responsive grids, Outfit Google Fonts, frosted glass effects)
* **State Management**: React Hooks (`useState`, `useEffect`, `useParams`) and browser `localStorage`
* **Network fetching**: Fetch API (Open-Meteo key-less weather service)

---

## 🖥️ Browser Compatibility

Tested and optimized for:
* **Google Chrome / Chromium**: Fully compatible (including DevTools Sensors simulated location overrides).
* **Mozilla Firefox**: Fully compatible.
* **Safari (macOS / iOS)**: Fully compatible.
* **Microsoft Edge**: Fully compatible.

---

## 🏃 Localhost Setup Instructions

To run the application locally on your machine, follow these steps:

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (Node 18+ recommended).

### Installation
1. Extract the project ZIP folder or clone the repository.
2. Open your terminal in the project root directory.
3. Install the dependencies:
   ```bash
   npm install
   ```

### Development Server
Start the local server:
   ```bash
   npm run dev
   ```
4. Copy the local URL printed in the terminal (usually `http://localhost:5173`) and open it in your web browser.

### Simulated Testing in Chrome DevTools
1. Press `F12` or right-click and select **Inspect** to open Developer Tools.
2. Toggle **Device Toolbar** (`Ctrl+Shift+M` or `Cmd+Shift+M`) and select a simulated mobile screen (e.g., iPhone 12 Pro).
3. Click the three dots icon in DevTools -> **More Tools** -> **Sensors**.
4. Under **Location**, select a preset location or enter custom coordinates (e.g. Colombo Airport: `7.1811`, `79.8837` or Central Colombo: `6.9271`, `79.8612`) and watch computed distances update instantly.
