import PropTypes from 'prop-types';
import '../styles/UnitToggle.css';

const UnitToggle = ({unit, onToggle}) => {
  const handleClick = () => {
    onToggle(unit === 'metric' ? 'imperial' : 'metric');
  };

  return (
    <button className="unit-toggle" onClick={handleClick} aria-label="Toggle temperature unit">
      {unit === 'metric' ? '°C' : '°F'}
    </button>
  );
};

UnitToggle.propTypes = {
  unit: PropTypes.oneOf(['metric', 'imperial']).isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default UnitToggle;
