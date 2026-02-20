import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import '../styles/SearchBar.css';

const SearchBar = ({ onSearch, onSubmit }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (onSearch) onSearch(value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (onSubmit) onSubmit(query);
      // keep focus so user can type again immediately
      inputRef.current?.focus();
    }
  };

  return (
    <div className="search-bar" style={{ zIndex: 5 }}>
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Search city..."
        aria-label="Search city"
        autoComplete="off"
      />
    </div>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default SearchBar;
