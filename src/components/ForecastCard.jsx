import PropTypes from 'prop-types';
import { useState } from 'react';
import './ForecastCard.css';

const processForecast = (list) => {
  const result = [];
  const seenDates = new Set();
  for (const item of list) {
    const date = item.dt_txt.split(' ')[0];
    if (!seenDates.has(date)) {
      seenDates.add(date);
      result.push(item);
    }
    if (result.length === 5) break;
  }
  return result;
};

const ForecastCard = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  if (!data) {
    return (
      <div className="forecast-card glass-card">
        <div className="card-header">
          <h3 className="card-title">5-Day Forecast</h3>
        </div>
        <div className="forecast-list">
          <p className="card-footer-text">Loading forecast data...</p>
        </div>
      </div>
    );
  }

  const summaryData = processForecast(data);
  const forecastData = summaryData.map(item => {
    const date = new Date(item.dt * 1000);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
    
    const mainWeather = item.weather[0].main.toLowerCase();
    let iconType = 'cloud';
    if (mainWeather.includes('clear')) iconType = 'sun';
    else if (mainWeather.includes('cloud')) iconType = 'cloud-sun';
    else if (mainWeather.includes('rain') || mainWeather.includes('drizzle')) iconType = 'rain';
    
    return {
      day: dayName,
      icon: iconType,
      high: Math.round(item.main.temp_max),
      low: Math.round(item.main.temp_min),
    };
  });

  const groupedData = data.reduce((acc, item) => {
    const date = item.dt_txt.split(' ')[0];
    if (!acc[date]) acc[date] = [];
    acc[date].push(item);
    return acc;
  }, {});

  const getIcon = (type) => {
    switch (type) {
      case 'sun':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
        );
      case 'cloud':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
          </svg>
        );
      case 'cloud-sun':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v2"></path>
            <path d="M12 20v2"></path>
            <path d="M4.93 4.93l1.41 1.41"></path>
            <path d="M17.66 17.66l1.41 1.41"></path>
            <path d="M2 12h2"></path>
            <path d="M20 12h2"></path>
            <path d="M6.34 17.66l-1.41 1.41"></path>
            <path d="M19.78 4.93l-1.41 1.41"></path>
            <path d="M22 10h-1.26A8 8 0 1 0 13 20h9a5 5 0 0 0 0-10z" fill="#9ca3af" stroke="#9ca3af"></path>
          </svg>
        );
      case 'rain':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 13v2m0 4v2m-4-6v2m0 4v2m-4-6v2m0 4v2"></path>
            <path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25" fill="#9ca3af" stroke="#9ca3af"></path>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="forecast-card glass-card">
      <div className="card-header">
        <h3 className="card-title">5-Day Forecast</h3>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="calendar-icon">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
      </div>

      <div className="forecast-list">
        {forecastData.map((item, index) => (
          <div key={index} className="forecast-item">
            <span className="day-name">{item.day}</span>
            <div className="weather-icon-wrapper">
              {getIcon(item.icon)}
            </div>
            <div className="temp-range">
              <span className="high-temp">{item.high}°</span>
              <span className="low-temp">{item.low}°</span>
            </div>
          </div>
        ))}
      </div>

      <button className="view-calendar-btn" onClick={() => setIsModalOpen(true)}>
        View Full Calendar
      </button>

      {isModalOpen && (
        <div className="forecast-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="forecast-modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Detailed 5-Day Forecast</h2>
              <button className="close-modal" onClick={() => setIsModalOpen(false)}>&times;</button>
            </div>
            <div className="modal-body">
              {Object.keys(groupedData).map(dateStr => {
                const dayItems = groupedData[dateStr];
                const dateObj = new Date(dayItems[0].dt * 1000);
                const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
                
                return (
                  <div key={dateStr} className="modal-day-section">
                    <h3 className="day-section-title">{dayName}</h3>
                    <div className="hourly-grid">
                      {dayItems.map(item => {
                        const time = new Date(item.dt * 1000).toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });
                        const mainWeather = item.weather[0].main.toLowerCase();
                        let iconType = 'cloud';
                        if (mainWeather.includes('clear')) iconType = 'sun';
                        else if (mainWeather.includes('cloud')) iconType = 'cloud-sun';
                        else if (mainWeather.includes('rain')) iconType = 'rain';
                        
                        return (
                          <div key={item.dt} className="hourly-item">
                            <span className="hourly-time">{time}</span>
                            <div className="hourly-icon">{getIcon(iconType)}</div>
                            <span className="hourly-temp">{Math.round(item.main.temp)}°</span>
                            <div className="hourly-details">
                              <span>💧 {item.main.humidity}%</span>
                              <span>💨 {Math.round(item.wind.speed)}m/s</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

ForecastCard.propTypes = {
  data: PropTypes.array
};

export default ForecastCard;
