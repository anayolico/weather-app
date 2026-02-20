import { useEffect, useState } from 'react';
import '../styles/Splash.css';

const Splash = ({ onFinish }) => {
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    // first fade-in animation handled by CSS
    // start fade-out a little before finishing so transition feels smooth
    const fadeTimer = setTimeout(() => setFadingOut(true), 2200);
    const endTimer = setTimeout(() => {
      if (onFinish) onFinish();
    }, 3000);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(endTimer);
    };
  }, [onFinish]);

  return (
    <div className={`splash-screen${fadingOut ? ' fade-out' : ''}`}> 
      <div className="splash-content">
        <h1 className="splash-title">Weather App</h1>
        <p className="splash-tagline">Your Smart Weather Companion</p>
      </div>
    </div>
  );
};

export default Splash;
