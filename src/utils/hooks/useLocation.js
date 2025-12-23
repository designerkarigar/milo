import { useState, useEffect } from "react";

export const useLocation = () => {
  const [location, setLocation] = useState({ lat: null, long: null });
  const [locationError, setLocationError] = useState(null);
  const [isLocationLoading, setIsLocationLoading] = useState(true);

  useEffect(() => {
    // Check if geolocation is supported
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      setIsLocationLoading(false);
      return;
    }

    // Try to get location from localStorage first (to avoid asking permission every time)
    const savedLocation = localStorage.getItem("userLocation");
    if (savedLocation) {
      try {
        const parsed = JSON.parse(savedLocation);
        // Check if location is less than 24 hours old
        const now = new Date().getTime();
        if (parsed.timestamp && now - parsed.timestamp < 24 * 60 * 60 * 1000) {
          setLocation({ lat: parsed.lat, long: parsed.long });
          setIsLocationLoading(false);
          return;
        }
      } catch (e) {
        // Invalid saved location, continue to get new one
      }
    }

    // Get current position
    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 5 * 60 * 1000, // Accept cached location up to 5 minutes old
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        
        setLocation({ lat, long });
        setLocationError(null);
        
        // Save to localStorage with timestamp
        localStorage.setItem(
          "userLocation",
          JSON.stringify({
            lat,
            long,
            timestamp: new Date().getTime(),
          })
        );
        
        setIsLocationLoading(false);
      },
      (error) => {
        // Handle different error types
        let errorMessage = "Unable to retrieve your location";
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location access denied by user";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information unavailable";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out";
            break;
          default:
            errorMessage = "An unknown error occurred";
            break;
        }
        
        setLocationError(errorMessage);
        setIsLocationLoading(false);
      },
      options
    );
  }, []);

  return { location, locationError, isLocationLoading };
};

