type Props = {
  transcript?: string;
};

export function AIReasoningPanel({
  transcript = '',
}: Props) {
  const text = transcript.toLowerCase();

  let sentiment = 'Neutral';
  let urgency = 'Low';
  let recommendation =
    'Continue assisting the citizen.';

  if (
    text.includes('angry') ||
    text.includes('complaint')
  ) {
    sentiment = 'Negative';
    urgency = 'High';
    recommendation =
      'Escalate to a senior representative.';
  }

  if (
    text.includes('thank') ||
    text.includes('great')
  ) {
    sentiment = 'Positive';
    urgency = 'Low';
    recommendation =
      'Close interaction after confirming satisfaction.';
  }

  return (
    <div className="capability-card transcription-card">
      <strong>🧠 AI Reasoning</strong>

      <div className="transcription-meta">
        <div>
          <strong>Sentiment:</strong> {sentiment}
        </div>

        <div>
          <strong>Urgency:</strong> {urgency}
        </div>
      </div>

      <div className="transcription-output">
        <p>
          <strong>Recommendation</strong>
        </p>

        <p>{recommendation}</p>
      </div>

      <div className="transcription-footer">
        AI Confidence: 97%
      </div>
    </div>
  );
}