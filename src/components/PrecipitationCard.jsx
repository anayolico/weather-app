import { useState } from 'react';
import PropTypes from 'prop-types';
import './PrecipitationCard.css';

const PrecipitationCard = ({ data }) => {
  const [activeTab, setActiveTab] = useState('rain');

  if (!data) {
    return (
      <div className="precipitation-card glass-card">
        <div className="card-header">
          <div className="title-group">
            <h3 className="card-title">Precipitation</h3>
            <p className="card-subtitle">Loading data...</p>
          </div>
        </div>
      </div>
    );
  }

  const chartData = data.slice(0, 7).map(item => {
    const date = new Date(item.dt * 1000);
    const timeStr = date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });
    
    let value = Math.round(item.pop * 100);
    
    // Make the toggle functional
    if (activeTab === 'snow') {
      // If weather condition is not snow and there's no snow volume, set to 0
      const isSnowing = item.weather[0].main.toLowerCase().includes('snow') || item.snow;
      if (!isSnowing) value = 0;
    } else if (activeTab === 'rain') {
      // If weather condition is not rain and there's no rain volume, set to 0
      const isRaining = item.weather[0].main.toLowerCase().includes('rain') || 
                        item.weather[0].main.toLowerCase().includes('drizzle') || 
                        item.rain;
      if (!isRaining) value = 0;
    }

    return {
      time: timeStr,
      value: value
    };
  });

  const highestValue = Math.max(...chartData.map(d => d.value));

  return (
    <div className="precipitation-card glass-card">
      <div className="card-header">
        <div className="title-group">
          <h3 className="card-title">Precipitation</h3>
          <p className="card-subtitle">Probability of {activeTab} in the next 24 hours</p>
        </div>
        
        <div className="tab-group">
          <button 
            className={`tab-btn ${activeTab === 'rain' ? 'active' : ''}`}
            onClick={() => setActiveTab('rain')}
          >
            Rain
          </button>
          <button 
            className={`tab-btn ${activeTab === 'snow' ? 'active' : ''}`}
            onClick={() => setActiveTab('snow')}
          >
            Snow
          </button>
        </div>
      </div>

      <div className="chart-container">
        <div className="chart-bars">
          {chartData.map((item, index) => (
            <div key={index} className="chart-column">
              <div className="bar-wrapper">
                <div 
                  className={`bar-fill ${item.value > 60 ? 'high' : ''}`} 
                  style={{ height: `${item.value}%` }}
                >
                  {item.value === highestValue && item.value > 0 && (
                    <span className="bar-tooltip">{item.value}%</span>
                  )}
                </div>
              </div>
              <span className="chart-label">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

PrecipitationCard.propTypes = {
  data: PropTypes.array
};

export default PrecipitationCard;
