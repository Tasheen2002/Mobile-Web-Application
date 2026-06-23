import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { attractionsData } from '../utils/data';
import { calculateDistance } from '../utils/geolocation';

/**
 * Landmark Detailed View page consuming AppContext.
 * Fetches real-time weather using Open-Meteo REST API,
 * displays GPS distance calculations, and deep-links to Maps.
 */
export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const { userLocation, favorites, toggleFavorite, profile } = useAppContext();
  const unit = profile.unit;

  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [weatherError, setWeatherError] = useState(null);

  // Find target attraction
  const attraction = attractionsData.find(item => item.id === id);

  useEffect(() => {
    if (!attraction) return;

    let isMounted = true;
    setWeatherLoading(true);
    setWeatherError(null);

    // Weather API call using Fetch API
    const lat = attraction.latitude;
    const lng = attraction.longitude;
    const tempUnitQuery = unit === 'imperial' ? '&temperature_unit=fahrenheit' : '';
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true${tempUnitQuery}`;

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to retrieve weather data');
        }
        return response.json();
      })
      .then(data => {
        if (isMounted) {
          if (data && data.current_weather) {
            setWeather(data.current_weather);
          } else {
            throw new Error('Malformed weather response');
          }
          setWeatherLoading(false);
        }
      })
      .catch(err => {
        if (isMounted) {
          setWeatherError(err.message || 'Weather unavailable');
          setWeatherLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id, unit, attraction]);

  if (!attraction) {
    return (
      <div className="app-container" id="detail-not-found">
        <div className="empty-state">
          <svg className="empty-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h3 className="empty-title">Attraction Not Found</h3>
          <p className="empty-text">The requested attraction could not be found or does not exist.</p>
          <Link to="/" className="empty-btn" id="not-found-back-link">Go to Home</Link>
        </div>
      </div>
    );
  }

  const { name, category, description, imageUrl, tips, latitude, longitude } = attraction;
  const isFavorited = favorites.includes(id);

  // Compute live distance
  const distance = userLocation 
    ? calculateDistance(userLocation.latitude, userLocation.longitude, latitude, longitude, unit)
    : null;

  // Helper to resolve Weather Code into visual cues
  const getWeatherDescription = (code) => {
    if (code === undefined || code === null) return { desc: 'Unknown', icon: '☁️' };
    
    switch (code) {
      case 0:
        return { desc: 'Clear Sky', icon: '☀️' };
      case 1:
      case 2:
      case 3:
        return { desc: 'Partly Cloudy', icon: '⛅' };
      case 45:
      case 48:
        return { desc: 'Foggy Weather', icon: '🌫️' };
      case 51:
      case 53:
      case 55:
        return { desc: 'Light Drizzle', icon: '🌧️' };
      case 61:
      case 63:
      case 65:
        return { desc: 'Rainy', icon: '🌧️' };
      case 80:
      case 81:
      case 82:
        return { desc: 'Showers', icon: '🌦' };
      case 95:
      case 96:
      case 99:
        return { desc: 'Thunderstorm', icon: '⛈️' };
      default:
        return { desc: 'Cloudy / Mild', icon: '☁️' };
    }
  };

  const weatherDetails = weather ? getWeatherDescription(weather.weathercode) : null;
  const mapLink = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

  return (
    <div className="app-container detail-container" id={`detail-page-${id}`}>
      {/* Hero Media Section */}
      <div className="detail-hero">
        <img src={imageUrl} alt={name} className="detail-img" />
        
        {/* Back navigation button (Explicitly 48x48px touch target) */}
        <button 
          className="detail-back-btn" 
          onClick={() => navigate(-1)}
          aria-label="Navigate back"
          id="detail-back-arrow"
          style={{ width: '48px', height: '48px' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ width: '24px', height: '24px' }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Favorite toggle button (Explicitly 48x48px touch target) */}
        <button 
          className={`detail-fav-btn ${isFavorited ? 'favorited' : ''}`}
          onClick={() => toggleFavorite(id)}
          aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
          id="detail-favorite-star"
          style={{ width: '48px', height: '48px' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill={isFavorited ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{ width: '22px', height: '22px' }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.907c.961 0 1.36 1.246.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.773-.564-.373-1.81.588-1.81h4.906a1 1 0 00.95-.69l1.519-4.674z" />
          </svg>
        </button>
      </div>

      {/* Main Attraction Information Body */}
      <div className="detail-body">
        <div className="detail-meta-row">
          <span className="detail-category">{category}</span>
          <span className="detail-distance" id="detail-distance-badge">
            {distance !== null ? `${distance} ${unit === 'imperial' ? 'miles' : 'km'} away` : 'Calculating distance...'}
          </span>
        </div>

        <h2 className="detail-title">{name}</h2>

        {/* Dynamic Asynchronous Weather Widget */}
        <div className="weather-card" id="detail-weather-widget">
          {weatherLoading ? (
            <div className="weather-loading-text" id="weather-loading">
              Fetching current weather...
            </div>
          ) : weatherError ? (
            <div className="weather-loading-text" id="weather-error" style={{ color: 'var(--text-muted)' }}>
              Weather service currently offline
            </div>
          ) : (
            <>
              <div className="weather-info">
                <div className="weather-temp-row">
                  <span className="weather-temp" id="weather-temperature">
                    {Math.round(weather.temperature)}
                  </span>
                  <span className="weather-unit">
                    °{unit === 'imperial' ? 'F' : 'C'}
                  </span>
                </div>
                <span className="weather-status" id="weather-status-description">
                  {weatherDetails.desc}
                </span>
              </div>
              <div className="weather-icon-wrapper" id="weather-status-icon" aria-label={weatherDetails.desc}>
                {weatherDetails.icon}
              </div>
            </>
          )}
        </div>

        {/* Description Section */}
        <section className="detail-section">
          <h4 className="detail-section-title">Overview</h4>
          <p className="detail-text" id="detail-overview-text">{description}</p>
        </section>

        {/* Tips Section */}
        <section className="detail-section" style={{ backgroundColor: 'var(--bg-secondary)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-glass)' }}>
          <h4 className="detail-section-title" style={{ color: 'var(--accent)' }}>Local Insider Tips</h4>
          <p className="detail-text" id="detail-tips-text" style={{ fontStyle: 'italic' }}>"{tips}"</p>
        </section>

        {/* Map Deep-link Trigger (Explicitly 52px height touch target) */}
        <a 
          href={mapLink} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="maps-action-btn"
          id="detail-open-maps-btn"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Navigate with Maps
        </a>
      </div>
    </div>
  );
}
