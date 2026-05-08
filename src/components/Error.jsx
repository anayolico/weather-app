import PropTypes from 'prop-types';

const Error = ({ message }) => {
  const isNotFound = message.toLowerCase().includes('not found');
  
  return (
    <div className="error-state">
      <div className="error-icon">{isNotFound ? '🔍' : '⚠️'}</div>
      <h2 className="error-title">{isNotFound ? 'City Not Found' : 'Oops!'}</h2>
      <p className="error-message">
        {isNotFound 
          ? "We couldn't find the city you're looking for. Please check the spelling and try again." 
          : message}
      </p>
    </div>
  );
};

Error.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Error;