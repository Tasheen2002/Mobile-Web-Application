import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';

/**
 * Traveler Profile Page featuring client-side form validation
 * and travelers dashboard analytics, consuming AppContext.
 */
export default function Profile() {
  const { profile, saveProfile, favorites } = useAppContext();
  const favoritesCount = favorites.length;

  const [name, setName] = useState(profile.name);
  const [unit, setUnit] = useState(profile.unit);
  const [nameError, setNameError] = useState(null);
  const [showToast, setShowToast] = useState(false);

  // Sync states when profile prop from context updates
  useEffect(() => {
    setName(profile.name);
    setUnit(profile.unit);
  }, [profile]);

  // Client-side validation function
  const validateName = (value) => {
    const trimmedVal = value.trim();
    if (trimmedVal.length === 0) {
      return "Traveler name cannot be blank.";
    }
    if (trimmedVal.length < 3) {
      return "Name must be at least 3 characters long.";
    }
    if (trimmedVal.length > 20) {
      return "Name cannot exceed 20 characters.";
    }
    if (/[<>]/.test(value)) {
      return "Name contains invalid characters.";
    }
    return null;
  };

  const handleNameChange = (e) => {
    const val = e.target.value;
    setName(val);
    const error = validateName(val);
    setNameError(error);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const error = validateName(name);
    if (error) {
      setNameError(error);
      return;
    }
    
    // Save to AppContext (and localStorage)
    saveProfile({ name: name.trim(), unit });
    
    // Trigger success feedback
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  // Determine travel rank dynamically based on user bookmarks count
  const getTravelTier = (count) => {
    if (count >= 3) return 'Coastal Explorer';
    if (count >= 1) return 'Local Scout';
    return 'New Arrival';
  };

  const isFormInvalid = !!nameError || name.trim().length < 3;

  return (
    <div className="app-container" id="profile-page">
      {/* Traveler Stats Dashboard */}
      <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '16px', borderLeft: '3.5px solid var(--accent)', paddingLeft: '8px' }}>
        Traveler Dashboard
      </h2>
      
      <div className="profile-card" id="profile-dashboard">
        <div className="profile-stats-row">
          <div className="profile-stat-box" id="stat-bookmarks">
            <span className="profile-stat-val" id="stat-count">{favoritesCount}</span>
            <span className="profile-stat-lbl">Saved Places</span>
          </div>
          <div className="profile-stat-box" id="stat-rank">
            <span className="profile-stat-val" id="stat-tier" style={{ fontSize: '1.1rem', padding: '4px 0' }}>
              {getTravelTier(favoritesCount)}
            </span>
            <span className="profile-stat-lbl">Traveler Rank</span>
          </div>
        </div>
      </div>

      {/* Traveler Preferences Form with Strict Client-Side Validation */}
      <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '16px', borderLeft: '3.5px solid var(--accent)', paddingLeft: '8px' }}>
        Settings & Preferences
      </h2>

      <form className="profile-card" onSubmit={handleSubmit} id="profile-preferences-form" noValidate>
        {/* Name Input Group */}
        <div className="form-group">
          <label htmlFor="traveler-name-input" className="form-label">
            Traveler Name
          </label>
          <input 
            type="text"
            id="traveler-name-input"
            className={`form-input ${nameError ? 'invalid' : ''}`}
            placeholder="Enter your name"
            value={name}
            onChange={handleNameChange}
            required
            aria-describedby="name-error-message"
          />
          {nameError && (
            <div className="error-message" id="name-error-message" role="alert">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ width: '14px', height: '14px', flexShrink: 0 }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{nameError}</span>
            </div>
          )}
        </div>

        {/* Toggle Unit Button Group */}
        <div className="form-group">
          <label className="form-label">Distance Units</label>
          <div className="toggle-group" role="group" aria-label="Distance unit selection">
            <button
              type="button"
              className={`toggle-btn ${unit === 'metric' ? 'active' : ''}`}
              onClick={() => setUnit('metric')}
              id="unit-toggle-metric"
            >
              Metric (km / °C)
            </button>
            <button
              type="button"
              className={`toggle-btn ${unit === 'imperial' ? 'active' : ''}`}
              onClick={() => setUnit('imperial')}
              id="unit-toggle-imperial"
            >
              Imperial (miles / °F)
            </button>
          </div>
        </div>

        {/* Submit Action Button */}
        <button 
          type="submit" 
          className="submit-btn" 
          disabled={isFormInvalid}
          id="profile-save-btn"
        >
          Save Preferences
        </button>

        {/* Toast Notification Alert */}
        {showToast && (
          <div className="toast" id="preferences-save-toast" role="status">
            Preferences saved successfully!
          </div>
        )}
      </form>
    </div>
  );
}
