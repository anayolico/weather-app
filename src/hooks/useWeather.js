import { useState, useEffect, useCallback } from 'react';
import weatherService from '../services/weatherService';

const groupForecast = (list) => {
  const days = {};
  list.forEach((item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString();
    if (!days[date]) days[date] = [];
    days[date].push(item);
  });
  return Object.entries(days)
    .map(([date, items]) => {
      const temps = items.map((i) => i.main.temp);
      const { icon, description } = items[0].weather[0];
      return {
        date,
        temps,
        icon: `https://openweathermap.org/img/wn/${icon}@2x.png`,
        description,
      };
    })
    .slice(0, 5); // only first 5 days
};

export const useWeather = () => {
  const [current, setCurrent] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = useCallback(async ({lat, lon, city, unit='metric'}) => {
    setLoading(true);
    setError(null);
    try {
      let data;
      if (city) {
        data = await weatherService.fetchByCity(city, unit);
        const { coord } = data;
        const fc = await weatherService.fetchForecast(coord.lat, coord.lon, unit);
        setForecast(groupForecast(fc.list));
      } else if (lat && lon) {
        data = await weatherService.fetchByCoords(lat, lon, unit);
        const fc = await weatherService.fetchForecast(lat, lon, unit);
        setForecast(groupForecast(fc.list));
      }
      setCurrent(data);
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
      setForecast([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const convertUnits = (toUnit) => {
    if (!current) return;
    // lazy load convert utilities
    import('../utils/convert').then(({ convertWeatherData, cToF, fToC }) => {
      const convertedCurrent = convertWeatherData(current, toUnit);
      setCurrent(convertedCurrent);
      // convert forecast temps arrays
      const convFc = forecast.map((day) => {
        const convertedTemps = day.temps.map((t) =>
          toUnit === 'metric' ? fToC(t) : cToF(t)
        );
        return { ...day, temps: convertedTemps };
      });
      setForecast(convFc);
    });
  };

  return { current, forecast, loading, error, fetchWeather, convertUnits };
};
