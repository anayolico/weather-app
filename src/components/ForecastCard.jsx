import PropTypes from 'prop-types';
import '../styles/ForecastCard.css';

const ForecastCard = ({ day, unit }) => {
  const { date, temps, icon, description } = day;
  const avgTemp = Math.round(temps.reduce((a, b) => a + b, 0) / temps.length);

  return (
    <div className="forecast-card glass">
      <h4>{date}</h4>
      <img src={icon} alt={description} />
      <p>{avgTemp} {unit === 'metric' ? '°C' : '°F'}</p>
      <p className="desc">{description}</p>
    </div>
  );
};

ForecastCard.propTypes = {
  day: PropTypes.shape({
    date: PropTypes.string.isRequired,
    temps: PropTypes.arrayOf(PropTypes.number).isRequired,
    icon: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  unit: PropTypes.oneOf(['metric','imperial']).isRequired,
};

export default ForecastCard;
