import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { attractionsData } from '../utils/data';
import { calculateDistance } from '../utils/geolocation';
import AttractionCard from '../components/AttractionCard';

/**
 * Explore Home Page containing category filtering, active searching,
 * and computed distance sorting, consuming Context API.
 */
export default function Home() {
  const { userLocation, favorites, toggleFavorite, profile } = useAppContext();
  const unit = profile.unit;

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Sanitizes search input to prevent injection & clean queries
  const handleSearchChange = (e) => {
    const rawVal = e.target.value;
    const sanitizedVal = rawVal.replace(/[<>]/g, '').trimStart();
    setSearchQuery(sanitizedVal);
  };

  const categories = ['All', 'Beach', 'Historical', 'Nature'];

  // Process items: filter by category, search, and calculate distance
  const processedAttractions = attractionsData
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
    })
    .filter(landmark => {
      // Category filter
      if (selectedCategory !== 'All' && landmark.category !== selectedCategory) {
        return false;
      }
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          landmark.name.toLowerCase().includes(query) ||
          landmark.category.toLowerCase().includes(query) ||
          landmark.description.toLowerCase().includes(query)
        );
      }
      return true;
    });

  // Sort by distance if GPS coordinates are active (closest first)
  if (userLocation) {
    processedAttractions.sort((a, b) => a.distance - b.distance);
  }

  return (
    <div className="app-container" id="home-page">
      {/* Welcome & Brand Title */}
      <div className="home-welcome-header">
        <h1 className="home-title">
          Explore <span>Negombo</span>
        </h1>
        <p className="home-subtitle">Discover the lagoon city & coastal sights</p>
      </div>

      {/* Search Input Section */}
      <div className="search-container">
        <svg
          className="search-icon"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          className="search-input"
          placeholder="Search Negombo sights..."
          value={searchQuery}
          onChange={handleSearchChange}
          aria-label="Search attractions"
          id="search-attractions"
        />
        {searchQuery && (
          <button
            type="button"
            className="search-clear-btn"
            onClick={() => setSearchQuery('')}
            aria-label="Clear search"
            id="clear-search-btn"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Category Scrollable Filter Tabs */}
      <div className="filters-scroll" role="tablist" aria-label="Attraction Categories">
        {categories.map(cat => (
          <button
            key={cat}
            role="tab"
            aria-selected={selectedCategory === cat}
            className={`filter-tab ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
            id={`filter-tab-${cat.toLowerCase()}`}
            style={{ minHeight: '48px', padding: '0 20px' }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Attractions Grid with Category Transition Fade (Mapped to key for remount transition animation) */}
      {processedAttractions.length > 0 ? (
        <div
          className="cards-grid fade-in-transition"
          id="attractions-grid"
          key={selectedCategory} // Remounts and triggers fade-in animation on category change
          style={{ animation: 'fadeIn 0.2s ease-out' }}
        >
          {processedAttractions.map(landmark => (
            <AttractionCard
              key={landmark.id}
              attraction={landmark}
              distance={landmark.distance}
              unit={unit}
              isFavorited={favorites.includes(landmark.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state" id="search-empty-state">
          <svg
            className="empty-icon"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="empty-title">No sights found</h3>
          <p className="empty-text">We couldn't find anything matching "{searchQuery}". Try selecting another category or typing different keywords.</p>
          <button
            className="empty-btn"
            onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
            id="reset-search-btn"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
