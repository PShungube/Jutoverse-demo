import { useEffect, useState } from 'react';


type TranslationPanelProps = {
  transcript?: string;
};

export function TranslationPanel({
  transcript,
}: TranslationPanelProps) {
  const [sourceLanguage, setSourceLanguage] =
    useState('English');

  const [targetLanguage, setTargetLanguage] =
    useState('Arabic');

  const [sourceText, setSourceText] =
    useState('');

  useEffect(() => {
    if (transcript) {
      setSourceText(transcript);
    }
  }, [transcript]);

  const translateText = () => {
  if (!sourceText.trim()) {
    return 'Translation will appear here...';
  }

  const dictionary: Record<
    string,
    Record<string, string>
  > = {
    hello: {
      Arabic: 'مرحبا',
      Russian: 'Привет',
      Amharic: 'ሰላም',
    },
    thanks: {
      Arabic: 'شكرا',
      Russian: 'Спасибо',
      Amharic: 'አመሰግናለሁ',
    },
    welcome: {
      Arabic: 'أهلا بك',
      Russian: 'Добро пожаловать',
      Amharic: 'እንኳን ደህና መጡ',
    },
  };

  const key =
    sourceText.toLowerCase().trim();

  return (
    dictionary[key]?.[targetLanguage] ||
    `[${targetLanguage}] ${sourceText}`
  );
};

const getSuggestions = () => {
  const text = sourceText.toLowerCase();

  const suggestions: string[] = [];

  if (
    text.includes('identity') ||
    text.includes('id')
  ) {
    suggestions.push(
      'Verify citizen identity records'
    );
  }

  if (text.includes('passport')) {
    suggestions.push(
      'Validate passport information'
    );
  }

  if (
    text.includes('benefit') ||
    text.includes('grant')
  ) {
    suggestions.push(
      'Review benefits eligibility'
    );
  }

  if (
    text.includes('application')
  ) {
    suggestions.push(
      'Open application workflow'
    );
  }

  if (
    text.includes('complaint')
  ) {
    suggestions.push(
      'Escalate complaint for review'
    );
  }

  if (suggestions.length === 0) {
    suggestions.push(
      'Review citizen request'
    );

    suggestions.push(
      'Confirm supporting documents'
    );
  }

  return suggestions;
};

  return (
    <div className="capability-card transcription-card">
      <div className="transcription-header">
        <div>
          <strong>Real-Time Translation</strong>

          <p className="muted-text">
            Multilingual translation assistance
          </p>
        </div>

        <div className="transcription-controls">
          <select
            value={sourceLanguage}
            onChange={(e) =>
              setSourceLanguage(e.target.value)
            }
          >
            <option>English</option>
            <option>Arabic</option>
            <option>Russian</option>
            <option>Amharic</option>
          </select>

          <select
            value={targetLanguage}
            onChange={(e) =>
              setTargetLanguage(e.target.value)
            }
          >
            <option>English</option>
            <option>Arabic</option>
            <option>Russian</option>
            <option>Amharic</option>
          </select>
        </div>
      </div>

      <div className="transcription-meta">
        <div>
          <strong>From:</strong> {sourceLanguage}
        </div>

        <div>
          <strong>To:</strong> {targetLanguage}
        </div>
      </div>

      <textarea
        value={sourceText}
        onChange={(e) =>
          setSourceText(e.target.value)
        }
        placeholder="Type text to translate..."
        rows={4}
        style={{
          width: '100%',
          marginTop: '1rem',
          padding: '0.75rem',
        }}
      />
<div className="transcription-output">
  <div className="transcript-message">
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '0.5rem',
      }}
    >
      <strong>Translated Output</strong>

      <span
        style={{
          padding: '0.25rem 0.75rem',
          borderRadius: '999px',
          fontSize: '0.8rem',
          fontWeight: 600,
        }}
      >
        Confidence: 96%
      </span>
    </div>

    <p>{translateText()}</p>
    <div
  style={{
    marginTop: '1rem',
    paddingTop: '1rem',
    borderTop: '1px solid rgba(255,255,255,0.1)',
  }}
>
  <strong>AI Suggested Actions</strong>
  <ul
  style={{
    marginTop: '0.5rem',
    paddingLeft: '1.25rem',
  }}
>
  {getSuggestions().map(
    (suggestion: string, index: number) => (
      <li key={index}>
        {suggestion}
      </li>
    )
  )}
</ul>

  
</div>
  </div>
</div>
      
      <div className="transcription-footer">
        <strong>Supported:</strong>

        <span> English • </span>
        <span> Arabic • </span>
        <span> Russian • </span>
        <span> Amharic </span>
      </div>
    </div>
    );
    }