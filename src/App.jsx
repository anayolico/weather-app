import { useState, useEffect, useCallback } from 'react';
import { useWeather } from './hooks/useWeather';
import { debounce } from './utils/debounce';
import Navbar from './components/Navbar';
import HeroWeatherCard from './components/HeroWeatherCard';
import AirQualityCard from './components/AirQualityCard';
import RadarCard from './components/RadarCard';
import VisibilityCard from './components/VisibilityCard';
import PrecipitationCard from './components/PrecipitationCard';
import ForecastCard from './components/ForecastCard';
import Error from './components/Error';
import Splash from './components/Splash';
import { HeroSkeleton, CardSkeleton } from './components/Skeletons';
import Toast from './components/Toast';
import "./index.css";
import "./App.css";

function App() {
  const { current, aqi, forecast, loading, error, fetchWeather } = useWeather();
  const [unit, setUnit] = useState(() => localStorage.getItem('unit') || 'metric');
  const [showSplash, setShowSplash] = useState(true);
  const [permissionDenied, setPermissionDenied] = useState(false);

  const [isLocating, setIsLocating] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'info') => {
    setToast({ message, type });
  }, []);

  const handleSearch = useCallback(
    debounce((q) => {
      if (q) fetchWeather({ city: q, unit });
    }, 500),
    [unit, fetchWeather]
  );

  const tryCoords = useCallback(() => {
    if (!navigator.geolocation) {
      showToast("Geolocation is not supported by your browser", "error");
      return;
    }
    
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPermissionDenied(false);
        setIsLocating(false);
        fetchWeather({ lat: pos.coords.latitude, lon: pos.coords.longitude, unit });
      },
      (err) => {
        setIsLocating(false);
        if (err.code === 1) {
          setPermissionDenied(true);
          // Only show error toast if we don't have weather data yet
          if (!current) {
            showToast("Location access denied. Please enable it in browser settings.", "error");
          }
        } else {
          // If we already have data, don't annoy the user with a retry error
          if (!current) {
            showToast("Unable to retrieve location. Try searching for a city.", "info");
          }
        }
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  }, [fetchWeather, unit, showToast]);

  useEffect(() => {
    if (!showSplash) {
      tryCoords();
      // Initial helpful toast only if no data after a delay
      const timer = setTimeout(() => {
        // We check current via a fresh check inside the timeout
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showSplash, tryCoords]); // Removed current and showToast from dependencies

  // Re-fetch weather when unit changes
  useEffect(() => {
    if (current?.name) {
      fetchWeather({ city: current.name, unit });
    }
  }, [unit, fetchWeather]);

  return (
    <div className="app-shell">
      {showSplash && <Splash onFinish={() => setShowSplash(false)} />}

      {!showSplash && (
        <>
          <Navbar
            onSearch={handleSearch}
            onSubmit={(q) => fetchWeather({ city: q, unit })}
          />

          <main className="main-content">
            {loading ? (
              <div className="dashboard-grid">
                <div className="hero-section"><HeroSkeleton /></div>
                <div className="grid-middle">
                  <CardSkeleton /><CardSkeleton /><CardSkeleton /><CardSkeleton />
                </div>
                <div className="grid-bottom">
                  <CardSkeleton />
                </div>
              </div>
            ) : error ? (
              <Error message={error} />
            ) : !current ? (
              <div className="location-prompt">
                <p>Allow location access or search for a city to see weather data.</p>
                <button 
                  className={`loc-btn${isLocating ? ' loading' : ''}`} 
                  onClick={tryCoords}
                  disabled={isLocating}
                >
                  {isLocating ? 'Detecting Location...' : 'Enable location'}
                </button>
              </div>
            ) : (
              <div className="dashboard-grid">
                <div className="hero-section">
                  <HeroWeatherCard data={current} unit={unit} />
                </div>
                <div className="grid-middle">
                  <AirQualityCard aqi={aqi} />
                  <RadarCard lat={current.coord.lat} lon={current.coord.lon} city={current.name} />
                  <VisibilityCard visibility={current.visibility ? (current.visibility / 1000) : 10} />
                  <ForecastCard data={forecast} />
                </div>
                <div className="grid-bottom">
                  <PrecipitationCard data={forecast} />
                </div>
              </div>
            )}
          </main>
          
          {toast && (
            <Toast 
              message={toast.message} 
              type={toast.type} 
              onClose={() => setToast(null)} 
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;
