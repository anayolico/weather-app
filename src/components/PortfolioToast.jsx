import React, { useState, useEffect } from 'react';
import anayoLogo from '../assets/anayolico.png.png';
import './PortfolioToast.css';

const PortfolioToast = () => {
  const [visible, setVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const triggerToast = () => {
      setShouldRender(true);
      setVisible(true);

      // Hide after 8 seconds
      const hideTimeout = setTimeout(() => {
        setVisible(false);
        // Remove from DOM after transition completes (350ms)
        const removeTimeout = setTimeout(() => {
          setShouldRender(false);
        }, 350);
        return () => clearTimeout(removeTimeout);
      }, 8000);

      return () => clearTimeout(hideTimeout);
    };

    // First trigger after 3 seconds of launching the app
    const initialTimeout = setTimeout(triggerToast, 3000);

    // Repeat the notification cycle every 60 seconds (1 minute)
    const intervalId = setInterval(triggerToast, 60000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(intervalId);
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <div
      className={`ad-toast-container ${visible ? 'animate-enter' : 'animate-leave'}`}
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 10000,
      }}
      onClick={() => window.open('https://anayolico.name.ng', '_blank')}
    >
      <div className="ad-toast-content">
        <img src={anayoLogo} alt="Caleb Anayolico" className="ad-toast-logo" />
        <div className="ad-toast-text">
          <span className="ad-toast-title">Built by Caleb Anayolico</span>
          <span className="ad-toast-subtitle">Click to visit my portfolio</span>
        </div>
      </div>
      <button
        className="ad-toast-close"
        onClick={(e) => {
          e.stopPropagation(); // Avoid triggering window.open on container click
          setVisible(false);
          setTimeout(() => {
            setShouldRender(false);
          }, 350);
        }}
      >
        &times;
      </button>
    </div>
  );
};

export default PortfolioToast;
