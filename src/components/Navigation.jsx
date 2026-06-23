import React from 'react';
import { NavLink } from 'react-router-dom';

/**
 * Bottom navigation bar with touch-friendly links (min 48x48px target).
 * Uses react-router-dom NavLink to automatically handle active states.
 */
export default function Navigation() {
  return (
    <nav className="nav-container" id="bottom-navigation">
      <NavLink 
        to="/" 
        className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        id="nav-explore"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" 
          />
        </svg>
        <span>Explore</span>
      </NavLink>

      <NavLink 
        to="/favorites" 
        className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        id="nav-favorites"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.907c.961 0 1.36 1.246.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.773-.564-.373-1.81.588-1.81h4.906a1 1 0 00.95-.69l1.519-4.674z" 
          />
        </svg>
        <span>Favorites</span>
      </NavLink>

      <NavLink 
        to="/profile" 
        className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
        id="nav-profile"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
          />
        </svg>
        <span>Profile</span>
      </NavLink>
    </nav>
  );
}
