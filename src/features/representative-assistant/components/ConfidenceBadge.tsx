type ConfidenceBadgeProps = {
  score: number;
};

export function ConfidenceBadge({
  score,
}: ConfidenceBadgeProps) {
  return (
    <span
      style={{
        padding: '0.35rem 0.75rem',
        borderRadius: '999px',
        background: '#0ea5e9',
        color: 'white',
        fontSize: '0.8rem',
        fontWeight: 600,
      }}
    >
      Confidence: {score}%
    </span>
  );
}