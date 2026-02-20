import { useEffect, useState } from 'react';
import '../styles/BackgroundWrapper.css';

// weatherType: clear, rain, clouds, night, etc.
const gradientMap = {
  clear: 'clear-gradient',
  rain: 'rain-gradient',
  clouds: 'clouds-gradient',
  snow: 'snow-gradient',
  thunderstorm: 'rain-gradient',
  mist: 'clouds-gradient',
  night: 'night-gradient',
};

import PropTypes from 'prop-types';

const BackgroundWrapper = ({ weatherType, children }) => {
  // start with the clear gradient so there's no white flash on mount
  const initial = gradientMap[weatherType || 'clear'] || 'clear-gradient';
  const [cls, setCls] = useState(initial);

  useEffect(() => {
    const key = weatherType || 'clear';
    setCls(gradientMap[key] || 'clear-gradient');
  }, [weatherType]);

  return <div className={`background-wrapper ${cls}`}>{children}</div>;
};

BackgroundWrapper.propTypes = {
  weatherType: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default BackgroundWrapper;
