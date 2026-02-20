import { useState, useEffect, useCallback } from 'react';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { useWeather } from './hooks/useWeather';
import { debounce } from './utils/debounce';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import ForecastCard from './components/ForecastCard';
import ThemeToggle from './components/ThemeToggle';
import UnitToggle from './components/UnitToggle';
import BackgroundWrapper from './components/BackgroundWrapper';
import Loading from './components/Loading';
import Error from './components/Error';
import Splash from './components/Splash';
import "./index.css";

function App() {
  const { current, forecast, loading, error, fetchWeather, convertUnits } = useWeather();
  const [unit, setUnit] = useState(() => {
    return localStorage.getItem('unit') || 'metric';
  });

  // splash screen visibility
  const [showSplash, setShowSplash] = useState(true);
  // track if user has denied geolocation permission so we can prompt search
  const [permissionDenied, setPermissionDenied] = useState(false);
  // remember that we've already tried requesting coords (so we don't repeat)
  const [locationRequested, setLocationRequested] = useState(false);

  const handleSearch = useCallback(
    debounce((q) => {
      if (q) {
        setPermissionDenied(false);
        fetchWeather({ city: q, unit });
      }
    }, 500),
    [unit, fetchWeather]
  );

  // helper to request geolocation; exported as callback so it can be used both
  // after splash automatically and by a manual button if needed.
  const tryCoords = useCallback(() => {
    if (!navigator.geolocation) return;
    setLocationRequested(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPermissionDenied(false);
        fetchWeather({ lat: pos.coords.latitude, lon: pos.coords.longitude, unit });
      },
      (err) => {
        if (err.code === 1) {
          setPermissionDenied(true);
        }
      }
    );
  }, [fetchWeather, unit]);

  const handleUnitToggle = (newUnit) => {
    setUnit(newUnit);
    localStorage.setItem('unit', newUnit);
    // convert existing data instead of re-fetching
    if (current) {
      convertUnits(newUnit);
    }
  };

  // request location once the splash has disappeared
  useEffect(() => {
    if (showSplash || locationRequested) return; // wait until splash is done and only once

    tryCoords();

    // watch for permission changes so we can re-try when granted later
    if (navigator.permissions && navigator.permissions.query) {
      navigator.permissions.query({ name: 'geolocation' }).then((perm) => {
        perm.onchange = () => {
          if (perm.state === 'granted') {
            setPermissionDenied(false);
            tryCoords();
          }
        };
      });
    }
  }, [showSplash, tryCoords, locationRequested]);

  let weatherType = current?.weather?.[0]?.main.toLowerCase() || 'clear';
  const iconCode = current?.weather?.[0]?.icon || '';
  if (iconCode.endsWith('n')) {
    weatherType = 'night';
  }

  useEffect(() => {
    const descriptionTag = document.querySelector('meta[name="description"]');
    if (current?.name) {
      document.title = `${current.name} weather - Weather Forecast`;
      if (descriptionTag) {
        descriptionTag.setAttribute(
          'content',
          `Current weather in ${current.name}: ${current.weather[0].description}`
        );
      }
    } else {
      document.title = 'Weather Forecast';
      if (descriptionTag) {
        descriptionTag.setAttribute(
          'content',
          'Advanced Weather Forecast Progressive Web App built with React and Vite'
        );
      }
    }
  }, [current]);

  return (
    <ThemeProvider>
      <BackgroundWrapper weatherType={weatherType}>
          {showSplash && <Splash onFinish={() => setShowSplash(false)} />}
        <div className={`app-container${!showSplash ? ' visible' : ''}`}>
          {/* main content only shown when splash gone */}
          {!showSplash && (
            <>
              <header className="top-bar">
                <div className="search-wrap">
                  <SearchBar
                    onSearch={handleSearch}
                    onSubmit={(q) => {
                      if (q && q.trim()) {
                        fetchWeather({ city: q, unit });
                      } else {
                        // empty search should show a gentle error rather than fallback
                        setPermissionDenied(false); // clear any previous prompt
                        fetchWeather({ city: ' ' , unit }); // will trigger "City not found"
                      }
                    }}
                  />
                </div>
                <div className="controls">
                  <UnitToggle unit={unit} onToggle={handleUnitToggle} />
                  <ThemeToggle />
                </div>
              </header>

              {loading && <Loading />}
              {error && (
                <Error
                  message={
                    error === 'City not found'
                      ? 'City not found. Please try again.'
                      : error
                  }
                />
              )}

              {/* initial instruction before we get any weather or denial */}
              {!loading && !error && !current && !permissionDenied && (
                <div className="location-message">
                  <p>Please allow location access when prompted to load your local weather.</p>
                  <button className="loc-action" onClick={tryCoords}>Enable location</button>
                </div>
              )}

              {/* if user denied location, show small prompt */}
              {permissionDenied && !current && !error && (
                <div className="location-message">
                  <p>Location access was denied. Please search for a city manually.</p>
                  <button className="loc-action" onClick={() => {
                    setPermissionDenied(false);
                    tryCoords();
                  }}>
                    Try again
                  </button>
                </div>
              )}

              {current && !loading && !error && (
                <>
                  <WeatherCard data={current} unit={unit} />
                  <div className="forecast-list">
                    {forecast.map((day) => (
                      <ForecastCard key={day.date} day={day} unit={unit} />
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </BackgroundWrapper>
    </ThemeProvider>
  );
}

export default App;
