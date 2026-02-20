import PropTypes from 'prop-types';
import '../styles/Error.css';

const Error = ({ message }) => (
  <div className="error-message">
    <p>{message}</p>
  </div>
);

Error.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Error;