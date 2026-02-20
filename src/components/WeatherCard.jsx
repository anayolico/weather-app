import PropTypes from 'prop-types';
import '../styles/WeatherCard.css';

const WeatherCard = ({ data, unit }) => {
  if (!data) return null;

  const {
    name,
    sys: { country, sunrise, sunset },
    main: { temp, humidity, feels_like },
    weather,
    wind: { speed },
  } = data;

  const desc = weather[0].description;
  const icon = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

  const formatTime = (ts) => new Date(ts * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="weather-card glass">
      <h2>{name}, {country}</h2>
      <img src={icon} alt={desc} className="weather-icon" />
      <p className="temperature">{Math.round(temp)} {unit === 'metric' ? '°C' : '°F'}</p>
      <p className="description">{desc}</p>
      <ul className="details">
        <li>Humidity: {humidity}%</li>
        <li>Wind: {speed} {unit === 'metric' ? 'm/s' : 'mph'}</li>
        <li>Feels like: {Math.round(feels_like)}°</li>
        <li>Sunrise: {formatTime(sunrise)}</li>
        <li>Sunset: {formatTime(sunset)}</li>
      </ul>
    </div>
  );
};

WeatherCard.propTypes = {
  data: PropTypes.object,
  unit: PropTypes.oneOf(['metric', 'imperial']),
};

export default WeatherCard;
