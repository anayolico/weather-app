const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const parseJsonResponse = async (resp) => {
  const contentType = resp.headers.get('content-type') || '';
  const text = await resp.text();
  if (!contentType.includes('application/json')) {
    // Response might be HTML (offline page or error fallback)
    throw new Error('Network error or service unavailable');
  }
  try {
    return JSON.parse(text);
  } catch (e) {
    throw new Error('Invalid response from weather service');
  }
};

const fetchByCoords = async (lat, lon, unit = 'metric') => {
  const url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`;
  const resp = await fetch(url);
  if (!resp.ok) throw new Error('Failed to fetch weather');
  return parseJsonResponse(resp);
};

const fetchByCity = async (city, unit = 'metric') => {
  const url = `${BASE_URL}/weather?q=${encodeURIComponent(city)}&units=${unit}&appid=${API_KEY}`;
  const resp = await fetch(url);
  if (!resp.ok) throw new Error('City not found');
  return parseJsonResponse(resp);
};

const fetchForecast = async (lat, lon, unit = 'metric') => {
  const url = `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`;
  const resp = await fetch(url);
  if (!resp.ok) throw new Error('Failed to fetch forecast');
  return parseJsonResponse(resp);
};

export default {
  fetchByCoords,
  fetchByCity,
  fetchForecast,
};
