import PropTypes from 'prop-types';
import './SecondaryCard.css';

const AirQualityCard = ({ aqi = 1 }) => {
  const getAqiInfo = (val) => {
    switch(val) {
      case 1: return { label: 'Good', value: 20, desc: 'Air quality is satisfactory, and air pollution poses little or no risk.' };
      case 2: return { label: 'Fair', value: 45, desc: 'Air quality is acceptable; however, there may be some concern for sensitive people.' };
      case 3: return { label: 'Moderate', value: 75, desc: 'Members of sensitive groups may experience health effects.' };
      case 4: return { label: 'Poor', value: 115, desc: 'Everyone may begin to experience health effects; sensitive members more seriously.' };
      case 5: return { label: 'Very Poor', value: 165, desc: 'Health warnings of emergency conditions. The entire population is more likely to be affected.' };
      default: return { label: 'Good', value: 20, desc: 'Air quality is satisfactory.' };
    }
  };

  const info = getAqiInfo(aqi);

  return (
    <div className="secondary-card glass-card air-quality-card">
      <div className="card-header">
        <h3 className="card-title">Air Quality</h3>
        <span className={`status-badge ${info.label.toLowerCase().replace(' ', '-')}`}>{info.label}</span>
      </div>
      
      <div className="aqi-content">
        <span className="aqi-value">{info.value}</span>
        <span className="aqi-label">US AQI</span>
      </div>

      <div className="aqi-progress-container">
        <div className="aqi-progress-bar">
          <div className="aqi-progress-fill" style={{ width: `${(info.value / 200) * 100}%` }}></div>
        </div>
      </div>

      <p className="card-footer-text">
        {info.desc}
      </p>
    </div>
  );
};

AirQualityCard.propTypes = {
  aqi: PropTypes.number
};

export default AirQualityCard;
