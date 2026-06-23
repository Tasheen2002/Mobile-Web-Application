import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { attractionsData } from '../utils/data';
import { calculateDistance } from '../utils/geolocation';
import AttractionCard from '../components/AttractionCard';

/**
 * Favorites page showing list of bookmarked destinations, consuming Context.
 */
export default function Favorites() {
  const { userLocation, favorites, toggleFavorite, profile } = useAppContext();
  const unit = profile.unit;

  // Filter attractions to find bookmarked ones
  const favoritedAttractions = attractionsData
    .filter(landmark => favorites.includes(landmark.id))
    .map(landmark => {
      let distance = null;
      if (userLocation) {
        distance = calculateDistance(
          userLocation.latitude,
          userLocation.longitude,
          landmark.latitude,
          landmark.longitude,
          unit
        );
      }
      return { ...landmark, distance };
    });

  // Sort favorites by closest distance first if user location is available
  if (userLocation) {
    favoritedAttractions.sort((a, b) => a.distance - b.distance);
  }

  return (
    <div className="app-container" id="favorites-page">
      <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '16px', borderLeft: '3.5px solid var(--accent)', paddingLeft: '8px' }}>
        My Saved Places
      </h2>

      {favoritedAttractions.length > 0 ? (
        <div className="cards-grid fade-in-transition" id="favorites-grid">
          {favoritedAttractions.map(landmark => (
            <AttractionCard 
              key={landmark.id}
              attraction={landmark}
              distance={landmark.distance}
              unit={unit}
              isFavorited={true}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state" id="favorites-empty-state">
          <svg 
            className="empty-icon" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
            style={{ color: '#fbbf24', opacity: 0.8 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.907c.961 0 1.36 1.246.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.773-.564-.373-1.81.588-1.81h4.906a1 1 0 00.95-.69l1.519-4.674z" />
          </svg>
          <h3 className="empty-title">No Saved Places</h3>
          <p className="empty-text">
            Your bookmarks folder is empty. Browse the explore tab and tap the star icon to save landmarks for quick access.
          </p>
          <Link to="/" className="empty-btn" id="favorites-explore-btn">
            Explore Negombo
          </Link>
        </div>
      )}
    </div>
  );
}
