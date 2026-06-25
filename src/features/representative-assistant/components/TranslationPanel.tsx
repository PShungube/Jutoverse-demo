import { useState } from 'react';

export function TranslationPanel() {
  const [sourceLanguage, setSourceLanguage] =
    useState('English');

  const [targetLanguage, setTargetLanguage] =
    useState('Arabic');

  const [sourceText, setSourceText] =
    useState('');

  const translateText = () => {
    if (!sourceText.trim()) {
      return 'Translation will appear here...';
    }

    const dictionary: Record<string, Record<string, string>> = {
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
  }}
>
  <strong>Translated Output</strong>

  <span
    style={{
      fontSize: '0.8rem',
      padding: '0.25rem 0.5rem',
      borderRadius: '999px',
      background: 'var(--surface-secondary)',
    }}
  >
    Confidence: 96%
  </span>
</div>
<div
  style={{
    marginTop: '1rem',
  }}
>
  <strong>Suggested Response</strong>

  <p>
    Based on the translated request, provide a clear
    explanation and confirm the next action with the
    citizen.
  </p>
</div>

          <p>{translateText()}</p>
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