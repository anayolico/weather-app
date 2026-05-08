import PropTypes from 'prop-types';
import './SecondaryCard.css';

const VisibilityCard = ({ visibility = 10 }) => {
  return (
    <div className="secondary-card glass-card visibility-card">
      <div className="card-header">
        <h3 className="card-title">Visibility</h3>
        <svg className="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      </div>
      
      <div className="value-content">
        <span className="main-value">{visibility}</span>
        <span className="value-unit">km</span>
      </div>

      <div className="divider"></div>

      <p className="card-footer-text">
        Condition is perfectly clear
      </p>
    </div>
  );
};

VisibilityCard.propTypes = {
  visibility: PropTypes.number
};

export default VisibilityCard;
