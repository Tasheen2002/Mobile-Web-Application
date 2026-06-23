import React from 'react';
import { Link } from 'react-router-dom';

/**
 * AttractionCard displays summary info of an attraction.
 * Includes absolute positioned favorite toggle button and links to details.
 * 
 * @param {Object} props
 * @param {Object} props.attraction Landmark details
 * @param {number|null} props.distance Computed distance from user
 * @param {string} props.unit 'metric' (km) or 'imperial' (miles)
 * @param {boolean} props.isFavorited Bookmarked status
 * @param {Function} props.onToggleFavorite Toggle callback
 */
export default function AttractionCard({ 
  attraction, 
  distance, 
  unit, 
  isFavorited, 
  onToggleFavorite 
}) {
  const { id, name, category, description, imageUrl } = attraction;

  const handleFavClick = (e) => {
    e.preventDefault(); // Prevent navigating to detail page on button click
    e.stopPropagation();
    onToggleFavorite(id);
  };

  const formattedDistance = distance !== null 
    ? `${distance} ${unit === 'imperial' ? 'mi' : 'km'}` 
    : 'Calculating...';

  return (
    <article className="card-container" id={`card-${id}`}>
      {/* Favorite Button - Floating absolute. Min touch target 48x48px ensured by padding/dimensions */}
      <button 
        className={`fav-toggle-btn ${isFavorited ? 'favorited' : ''}`}
        onClick={handleFavClick}
        aria-label={isFavorited ? `Remove ${name} from favorites` : `Add ${name} to favorites`}
        id={`fav-btn-${id}`}
        style={{ width: '48px', height: '48px' }} // Explicit inline size to guarantee 48px touch target
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill={isFavorited ? "currentColor" : "none"} 
          stroke="currentColor"
          strokeWidth="2"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.907c.961 0 1.36 1.246.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.773-.564-.373-1.81.588-1.81h4.906a1 1 0 00.95-.69l1.519-4.674z" 
          />
        </svg>
      </button>

      <Link to={`/attraction/${id}`} className="card-link" id={`link-${id}`}>
        <div className="card-image-wrapper">
          <img 
            src={imageUrl} 
            alt={name} 
            className="card-img" 
            loading="lazy" 
          />
          <span className="card-category-badge">{category}</span>
          <span className="card-distance-badge" id={`distance-badge-${id}`}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              style={{ width: '12px', height: '12px' }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {formattedDistance}
          </span>
        </div>

        <div className="card-content">
          <h3 className="card-title">{name}</h3>
          <p className="card-desc">{description}</p>
        </div>
      </Link>
    </article>
  );
}
