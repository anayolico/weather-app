import { useState, useEffect, useCallback } from 'react';
import weatherService from '../services/weatherService';



export const useWeather = () => {
  const [current, setCurrent] = useState(null);
  const [aqi, setAqi] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = useCallback(async ({lat, lon, city, unit='metric'}) => {
    setLoading(true);
    setError(null);
    try {
      let weatherData;
      if (city) {
        weatherData = await weatherService.fetchByCity(city, unit);
      } else if (lat && lon) {
        weatherData = await weatherService.fetchByCoords(lat, lon, unit);
      }
      
      if (weatherData) {
        const { lat: cLat, lon: cLon } = weatherData.coord;
        const aqiData = await weatherService.fetchAirQuality(cLat, cLon);
        const forecastData = await weatherService.fetchForecast(cLat, cLon, unit);
        
        setAqi(aqiData.list[0].main.aqi);
        setForecast(forecastData.list);
        setCurrent(weatherData);
      }
    } catch (err) {
      let msg = err.message || 'Unknown error';
      if (!navigator.onLine) {
        msg = 'You appear to be offline. Please check your network connection.';
      } else if (
        msg.toLowerCase().includes('network error') ||
        msg.toLowerCase().includes('service unavailable') ||
        msg.toLowerCase().includes('invalid response')
      ) {
        msg = 'Unable to reach weather service. Try again later or check your connection.';
      }
      setError(msg);
      setCurrent(null);
      setAqi(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const convertUnits = (toUnit) => {
    if (!current) return;
    // lazy load convert utilities
    import('../utils/convert').then(({ convertWeatherData }) => {
      const convertedCurrent = convertWeatherData(current, toUnit);
      setCurrent(convertedCurrent);
    });
  };

  return { current, aqi, forecast, loading, error, fetchWeather, convertUnits };
};
