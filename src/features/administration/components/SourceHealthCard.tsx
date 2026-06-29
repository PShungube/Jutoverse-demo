export function SourceHealthCard() {
  return (
    <div className="capability-card">
      <strong>Source Health</strong>

      <ul>
        <li>Cloud Storage - Healthy</li>
        <li>BigQuery - Healthy</li>
        <li>Vertex AI - Healthy</li>
        <li>Document AI - Warning</li>
      </ul>
    </div>
  );
}