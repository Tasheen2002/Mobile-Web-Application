import React from 'react';
import { NavLink } from 'react-router-dom';

/**
 * Top Header component showing app logo, desktop navigation, and GPS status badge.
 * 
 * @param {Object} props
 * @param {Object|null} props.userLocation User's current location coordinates
 * @param {boolean} props.isMockLocation Whether we are using fallback/mock location coordinates
 */
export default function Header({ userLocation, isMockLocation }) {
  return (
    <header className="header-container" id="app-header">
      <div className="header-logo">
        Negombo<span>GO</span>
      </div>

      {/* Responsive Desktop-Only Navigation Links */}
      <nav className="desktop-nav" role="navigation" aria-label="Desktop Navigation">
        <NavLink 
          to="/" 
          className={({ isActive }) => `desktop-nav-link ${isActive ? 'active' : ''}`}
          id="desktop-nav-explore"
        >
          Explore
        </NavLink>
        <NavLink 
          to="/favorites" 
          className={({ isActive }) => `desktop-nav-link ${isActive ? 'active' : ''}`}
          id="desktop-nav-favorites"
        >
          Favorites
        </NavLink>
        <NavLink 
          to="/profile" 
          className={({ isActive }) => `desktop-nav-link ${isActive ? 'active' : ''}`}
          id="desktop-nav-profile"
        >
          Profile
        </NavLink>
      </nav>
      
      <div 
        className={`gps-badge ${userLocation ? 'active' : 'unavailable'}`}
        id="gps-status-badge"
        title={userLocation ? (isMockLocation ? "Using Simulated Location" : "Using Live Device GPS") : "GPS Permissions Required"}
      >
        <span className="gps-dot"></span>
        {userLocation ? (isMockLocation ? "GPS (Simulated)" : "GPS Active") : "GPS Offline"}
      </div>
    </header>
  );
}
