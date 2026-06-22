export function GroundedAnswerCard() {
  return (
    <div className="citation-card">
      <div className="signal-row__topline">
        <strong>Grounded Answer</strong>
        <span>Confidence: 92%</span>
      </div>

      <p>
        According to Government Benefits Procedure GOV-204,
        citizens requesting disability support must first
        complete identity verification and submit supporting
        documentation.
      </p>

      <div className="stack-list">
        <strong>Evidence Sources</strong>

        <ul>
          <li>Benefits Manual 2025</li>
          <li>Disability Services Circular</li>
          <li>Citizen Support Policy</li>
        </ul>
      </div>
    </div>
  );
}