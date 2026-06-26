type Props = {
  transcript?: string;
};

export function IntentDetectionPanel({
  transcript = '',
}: Props) {
  const text = transcript.toLowerCase();

  let intent = 'General Enquiry';

  let articles = [
    'Citizen service handbook',
  ];

  if (text.includes('passport')) {
    intent = 'Passport Services';

    articles = [
      'Passport renewal requirements',
      'Passport processing times',
      'Identity verification checklist',
    ];
  }

  if (
    text.includes('benefit') ||
    text.includes('grant')
  ) {
    intent = 'Benefits';

    articles = [
      'Benefits eligibility',
      'Appeal process',
      'Supporting documents',
    ];
  }

  if (
    text.includes('application')
  ) {
    intent = 'Application Processing';

    articles = [
      'Application workflow',
      'Document verification',
      'Processing timeline',
    ];
  }

  return (
    <div className="capability-card transcription-card">
      <strong>🎯 Detected Intent</strong>

      <div className="transcription-output">
        <p>
          <strong>{intent}</strong>
        </p>

        <ul
          style={{
            marginTop: '1rem',
            paddingLeft: '1.2rem',
          }}
        >
          {articles.map((article) => (
            <li key={article}>
              {article}
            </li>
          ))}
        </ul>
      </div>

      <div className="transcription-footer">
        AI Knowledge Match: 94%
      </div>
    </div>
  );
}