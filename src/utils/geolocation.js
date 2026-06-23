/**
 * Computes the great-circle distance between two points on the Earth's surface
 * using the Haversine formula.
 * 
 * @param {number} lat1 Latitude of start point (user)
 * @param {number} lon1 Longitude of start point (user)
 * @param {number} lat2 Latitude of end point (destination)
 * @param {number} lon2 Longitude of end point (destination)
 * @param {string} unit 'metric' (km) or 'imperial' (miles)
 * @returns {number} The distance rounded to 2 decimal places
 */
export function calculateDistance(lat1, lon1, lat2, lon2, unit = 'metric') {
  if (lat1 === undefined || lon1 === undefined || lat2 === undefined || lon2 === undefined) {
    return 0;
  }
  
  const R = 6371; // Earth's mean radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distanceKm = R * c;
  
  if (unit === 'imperial') {
    return Number((distanceKm * 0.621371).toFixed(2)); // Convert to miles
  }
  return Number(distanceKm.toFixed(2)); // Default kilometers
}
