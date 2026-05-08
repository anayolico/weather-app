import { useState } from 'react';
import PropTypes from 'prop-types';
import './SecondaryCard.css';

const RadarCard = ({ lat = 6.5244, lon = 3.3792, city = 'Lagos' }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Simplified map URL (OpenStreetMap)
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${lon-0.1},${lat-0.1},${lon+0.1},${lat+0.1}&layer=mapnik&marker=${lat},${lon}`;

  return (
    <>
      <div className="secondary-card glass-card radar-card">
        <div className="card-header">
          <h3 className="card-title">Live Radar</h3>
          <span className="live-badge">
            <span className="live-dot"></span>
            Live
          </span>
        </div>
        
        <div className="radar-map-container">
          <iframe 
            title="Weather Map"
            src={mapUrl}
            className="radar-iframe"
          />
          <div className="map-overlay">
             <button className="expand-map-btn" onClick={() => setIsExpanded(true)}>
               Expand <span className="map-highlight">Map</span>
             </button>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="map-modal-overlay" onClick={() => setIsExpanded(false)}>
          <div className="map-modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Live Radar - {city}</h3>
              <button className="close-modal" onClick={() => setIsExpanded(false)}>&times;</button>
            </div>
            <iframe 
              title="Expanded Weather Map"
              src={mapUrl.replace('0.1', '0.5').replace('0.1', '0.5')} // Larger view
              className="expanded-radar-iframe"
            />
          </div>
        </div>
      )}
    </>
  );
};

RadarCard.propTypes = {
  lat: PropTypes.number,
  lon: PropTypes.number,
  city: PropTypes.string,
};

export default RadarCard;
