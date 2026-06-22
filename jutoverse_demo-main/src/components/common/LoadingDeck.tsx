export function LoadingDeck() {
  return (
    <div className="loading-deck" aria-hidden="true">
      <div className="loading-strip" />
      <div className="metric-grid">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="loading-card" />
        ))}
      </div>
      <div className="page-grid">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="loading-panel" />
        ))}
      </div>
    </div>
  );
}
