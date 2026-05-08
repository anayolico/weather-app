import { useEffect, useState } from 'react';

const Splash = ({ onFinish }) => {
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadingOut(true), 2200);
    const endTimer = setTimeout(() => {
      if (onFinish) onFinish();
    }, 2700);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(endTimer);
    };
  }, [onFinish]);

  return (
    <div className={`splash-screen${fadingOut ? ' fade-out' : ''}`}>
      <div className="splash-content">
        <h1 className="splash-title">WeatherSky</h1>
        <p className="splash-tagline">Advanced Weather Intelligence</p>
        <div className="splash-info">
          <span className="status">Initializing system...</span>
        </div>
      </div>
    </div>
  );
};

export default Splash;
