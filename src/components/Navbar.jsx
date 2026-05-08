import { useState } from 'react';
import PropTypes from 'prop-types';
import './Navbar.css';

const Navbar = ({ onSearch, onSubmit }) => {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);

  const handleKey = (e) => {
    if (e.key === 'Enter' && query.trim()) {
      onSubmit(query.trim());
    }
  };

  const handleSearchBtn = () => {
    if (query.trim()) onSubmit(query.trim());
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };



  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="navbar-left">
        <div className="nav-brand">
          <span className="brand-icon">☁</span>
          <span className="brand-name">WeatherSky</span>
        </div>
      </div>



      <div className="nav-search-group">
        <div className={`nav-search${focused ? ' focused' : ''}`}>
          <input
            type="text"
            value={query}
            onChange={handleChange}
            onKeyDown={handleKey}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Search city..."
            aria-label="Search city"
            autoComplete="off"
            id="city-search-input"
          />
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Navbar;
