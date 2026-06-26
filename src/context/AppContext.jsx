import { createContext, useState, useEffect, useContext } from 'react';

// Create AppContext
const AppContext = createContext(null);

/**
 * AppContextProvider houses the global state (userLocation, favorites, and traveler settings)
 * and syncs configurations to browser localStorage.
 */
export function AppContextProvider({ children }) {
  // 1. Favorites State persisted via LocalStorage
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('negombo_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  // 2. Profile Settings State persisted via LocalStorage
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('negombo_profile');
    return saved ? JSON.parse(saved) : { name: 'Traveler', unit: 'metric' };
  });

  // 3. Geolocation API States
  const [userLocation, setUserLocation] = useState(null);
  const [isMockLocation, setIsMockLocation] = useState(false);
  const [locationError, setLocationError] = useState(null);

  // Sync favorites changes to localStorage
  useEffect(() => {
    localStorage.setItem('negombo_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const saveProfile = (newProfile) => {
    setProfile(newProfile);
    localStorage.setItem('negombo_profile', JSON.stringify(newProfile));
  };

  const toggleFavorite = (id) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
  };

  // 4. Run Geolocation initialization on provider mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
          setIsMockLocation(false);
          setLocationError(null);
        },
        (error) => {
          console.warn("GPS access unavailable, falling back to simulated location: ", error.message);
          // Fallback to Colombo Bandaranaike International Airport (BIA) coordinates
          setUserLocation({ latitude: 7.1811, longitude: 79.8837 });
          setIsMockLocation(true);
          setLocationError("GPS permission denied or timeout. Defaulting to Colombo Airport coordinates.");
        },
        { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
      );
    } else {
      setUserLocation({ latitude: 7.1811, longitude: 79.8837 });
      setIsMockLocation(true);
      setLocationError("Geolocation is not supported by your browser.");
    }
  }, []);

  const value = {
    favorites,
    toggleFavorite,
    profile,
    saveProfile,
    userLocation,
    isMockLocation,
    locationError
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

/**
 * Custom Hook to easily consume AppContext.
 */
export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
}
