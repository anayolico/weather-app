import PropTypes from 'prop-types';
import './HeroWeatherCard.css';

const HeroWeatherCard = ({ data, unit }) => {
  if (!data) return null;

  const {
    name,
    sys: { country, sunrise, sunset },
    main: { temp, humidity, feels_like, pressure },
    weather,
    wind: { speed },
    visibility,
    uvi,
  } = data;

  const desc = weather[0].description
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  const tempUnit = unit === 'metric' ? '°C' : '°F';
  const windUnit = unit === 'metric' ? 'km/h' : 'mph';
  const windSpeed = unit === 'metric' ? Math.round(speed * 3.6) : Math.round(speed);
  const visKm = visibility ? (visibility / 1000).toFixed(0) : '—';

  const today = new Date();
  const dateStr = today.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'short' });

  const uvLabel = (uvi) => {
    if (!uvi) return '—';
    if (uvi <= 2) return 'Low';
    if (uvi <= 5) return 'Moderate';
    if (uvi <= 7) return 'High';
    if (uvi <= 10) return 'Very High';
    return 'Extreme';
  };

  return (
    <div className="hero-card glass-card" role="region" aria-label="Current weather">
      <div className="hero-location">
        <svg className="pin-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
        <span className="hero-city">{name}, {country}</span>
      </div>
      <p className="hero-date">{dateStr}</p>

      <div className="hero-temp-row">
        <h1 className="hero-temp">{Math.round(temp)}<span className="hero-unit">{tempUnit}</span></h1>
      </div>
      <p className="hero-desc">{desc}</p>

      <div className="hero-stats">
        <div className="hero-stat">
          <span className="stat-label">HUMIDITY</span>
          <span className="stat-value">{humidity}%</span>
        </div>
        <div className="hero-stat">
          <span className="stat-label">WIND</span>
          <span className="stat-value">{windSpeed}{windUnit}</span>
        </div>
        <div className="hero-stat">
          <span className="stat-label">UV INDEX</span>
          <span className="stat-value">{uvi ? `High ${Math.round(uvi)}` : uvLabel(uvi)}</span>
        </div>
        <div className="hero-stat">
          <span className="stat-label">PRESSURE</span>
          <span className="stat-value">{pressure} hPa</span>
        </div>
      </div>
    </div>
  );
};

HeroWeatherCard.propTypes = {
  data: PropTypes.object,
  unit: PropTypes.string,
};

export default HeroWeatherCard;
