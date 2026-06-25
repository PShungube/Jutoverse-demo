import { ConfidenceBadge } from './ConfidenceBadge';

type GroundedAnswerCardProps = {
  answer: string;
  confidence: number;
  citations: string[];
};

export function GroundedAnswerCard({
  answer,
  confidence,
  citations,
}: GroundedAnswerCardProps) {
  return (
    <div className="citation-card">
      <div className="signal-row__topline">
        <strong>Grounded Answer</strong>
        <ConfidenceBadge score={confidence} />
      </div>

      <p>{answer}</p>

      <div className="stack-list">
        <strong>Evidence Sources</strong>

        <ul>
          {citations.map((citation) => (
            <li key={citation}>{citation}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}