import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext.jsx';
import '../styles/ThemeToggle.css';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
      {theme === 'dark' ? '🌙' : '☀️'}
    </button>
  );
};

export default ThemeToggle;
