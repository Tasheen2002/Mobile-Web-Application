import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useAppContext } from './context/AppContext';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';

/**
 * Main App component tying routing, layouts, and React Context together.
 */
export default function App() {
  const location = useLocation();
  const { userLocation, isMockLocation, locationError } = useAppContext();

  // Check if we are on a details route
  const isDetailsRoute = location.pathname.startsWith('/attraction/');

  return (
    <>
      {/* Brand Header & GPS Badge */}
      <Header userLocation={userLocation} isMockLocation={isMockLocation} />

      {/* Warning banner if location is mock/denied */}
      {locationError && !isDetailsRoute && (
        <div 
          style={{
            margin: '12px 16px 0 16px',
            padding: '10px 12px',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            borderRadius: '8px',
            color: '#ef4444',
            fontSize: '0.78rem',
            textAlign: 'center',
            lineHeight: '1.4'
          }}
          id="gps-warning-banner"
        >
          <strong>Simulated GPS:</strong> {locationError}
          <div style={{ fontSize: '0.7rem', color: '#a1a1aa', marginTop: '4px' }}>
            To test live coordinates, enable GPS or override coordinates in Chrome DevTools (Sensors panel).
          </div>
        </div>
      )}

      {/* Router View Switcher */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/attraction/:id" element={<Detail />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        
        {/* Elegant Footer */}
        <footer className="app-footer" id="app-footer">
          <p>© {new Date().getFullYear()} NegomboGO. Sri Lanka Tourism. All Rights Reserved.</p>
          <p style={{ marginTop: '4px', opacity: 0.6 }}>Designed for SENG 41293: Web Application Development</p>
        </footer>
      </main>

      {/* Persistent Bottom Nav Bar */}
      <Navigation />
    </>
  );
}
