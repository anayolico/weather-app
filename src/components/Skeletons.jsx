import './Skeletons.css';

export const HeroSkeleton = () => (
  <div className="hero-skeleton glass-card">
    <div className="sk-row">
      <div className="sk-box skeleton" style={{ width: '120px', height: '24px' }}></div>
      <div className="sk-circle skeleton" style={{ width: '80px', height: '80px' }}></div>
    </div>
    <div className="sk-box skeleton" style={{ width: '200px', height: '48px', marginTop: '20px' }}></div>
    <div className="sk-box skeleton" style={{ width: '150px', height: '24px', marginTop: '12px' }}></div>
    <div className="sk-row" style={{ marginTop: '40px' }}>
      <div className="sk-box skeleton" style={{ width: '100px', height: '40px', borderRadius: '20px' }}></div>
    </div>
  </div>
);

export const CardSkeleton = () => (
  <div className="card-skeleton glass-card">
    <div className="sk-box skeleton" style={{ width: '100px', height: '20px', marginBottom: '16px' }}></div>
    <div className="sk-box skeleton" style={{ width: '100%', height: '140px' }}></div>
  </div>
);

export const LocationsSkeleton = () => (
  <div className="locations-page" style={{ padding: '24px' }}>
    <div className="locations-grid">
      {/* Hero Skeleton */}
      <div className="location-hero glass-card skeleton" style={{ height: '400px' }}></div>
      
      {/* Saved List Skeleton */}
      <div className="saved-locations-section">
        <div className="sk-box skeleton" style={{ width: '150px', height: '24px', marginBottom: '24px' }}></div>
        {[1, 2, 3].map(i => (
          <div key={i} className="glass-card skeleton" style={{ height: '80px', marginBottom: '12px' }}></div>
        ))}
      </div>
    </div>
    <div className="locations-radar-section" style={{ marginTop: '24px' }}>
      <div className="glass-card skeleton" style={{ height: '300px' }}></div>
    </div>
  </div>
);
