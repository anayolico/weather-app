import { useState, useEffect, useCallback, useRef } from 'react';
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
import SEO from './components/SEO';
import PortfolioToast from './components/PortfolioToast';
import "./index.css";
import "./App.css";

function App() {
  const { current, aqi, forecast, loading, error, fetchWeather } = useWeather();
  const [unit, setUnit] = useState(() => localStorage.getItem('unit') || 'metric');
  const [showSplash, setShowSplash] = useState(true);
  const [permissionDenied, setPermissionDenied] = useState(false);

  const [isLocating, setIsLocating] = useState(false);
  const [toast, setToast] = useState(null);

  const currentRef = useRef(current);
  useEffect(() => {
    currentRef.current = current;
  }, [current]);

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

    const optionsHigh = { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 };
    const optionsLow = { enableHighAccuracy: false, timeout: 15000, maximumAge: 300000 };

    const getPosition = (options, isFallback = false) => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPermissionDenied(false);
          setIsLocating(false);
          fetchWeather({ lat: pos.coords.latitude, lon: pos.coords.longitude, unit });
        },
        (err) => {
          if (!isFallback && err.code !== 1) {
            // If high accuracy timed out/failed, retry with low accuracy
            getPosition(optionsLow, true);
          } else {
            setIsLocating(false);
            if (err.code === 1) {
              setPermissionDenied(true);
              // Only show error toast if we don't have weather data yet
              if (!currentRef.current) {
                showToast("Location access denied. Please enable it in browser settings.", "error");
              }
            } else {
              // If we already have data, don't annoy the user with a retry error
              if (!currentRef.current) {
                showToast("Unable to retrieve location. Try searching for a city.", "info");
              }
            }
          }
        },
        options
      );
    };

    getPosition(optionsHigh, false);
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
      <SEO 
        title={
          current 
            ? `Weather in ${current.name}, ${current.sys?.country} - ${Math.round(current.main?.temp)}°C | WeatherSky` 
            : "WeatherSky | Real-Time Weather Forecasts & Air Quality"
        }
        description={
          current 
            ? `Current weather in ${current.name}, ${current.sys?.country}: ${current.weather[0]?.description}. Temperature: ${Math.round(current.main?.temp)}°C. Wind: ${current.wind?.speed} m/s, humidity: ${current.main?.humidity}%. WeatherSky is a portfolio app by Caleb Anayolico.`
            : "WeatherSky is a portfolio weather app by Caleb Anayolico for real-time city forecasts, air quality, visibility, precipitation, and local weather conditions worldwide."
        }
        keywords={
          current 
            ? `${current.name} weather, ${current.name} live weather, ${current.name} forecast, WeatherSky, Caleb Anayolico, Anayolico weather app`
            : "WeatherSky, WeatherSky app, Caleb Anayolico weather app, Anayolico portfolio weather app, live weather, dynamic forecasts, air quality index, local weather"
        }
        cityData={current}
      />
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

          <footer className="app-footer">
            <a 
              href="https://anayolico.name.ng/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="app-footer-link"
              title="Caleb Anayolico's Web & Mobile Developer Portfolio"
            >
              Built by Caleb Anayolico 👨‍💻
            </a>
          </footer>
          
          {toast && (
            <Toast 
              message={toast.message} 
              type={toast.type} 
              onClose={() => setToast(null)} 
            />
          )}

          <PortfolioToast />
        </>
      )}
    </div>
  );
}

export default App;
