export function EnvironmentSummaryCard() {
  return (
    <div className="capability-card">
      <strong>Environment Status</strong>

      <ul>
        <li>Frontend: Running</li>
        <li>API: Mock Mode</li>
        <li>Database: Deferred</li>
        <li>Last Sync: 5 min ago</li>
      </ul>
    </div>
  );
}