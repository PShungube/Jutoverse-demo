export function GroundedAnswerCard() {
  return (
    <div
      style={{
        marginTop: '1rem',
        padding: '1rem',
        border: '1px solid rgba(255,255,255,0.15)',
        borderRadius: '12px',
      }}
    >
      <h3>Grounded Answer</h3>

      <p>
        According to Government Benefits Procedure GOV-204,
        citizens requesting disability support must first
        complete identity verification and submit supporting
        documentation.
      </p>

      <div style={{ marginTop: '0.75rem' }}>
        <strong>Confidence:</strong> 92%
      </div>
    </div>
  );
}