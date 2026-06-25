import { useEffect, useRef, useState } from 'react';
import { Mic, MicOff } from 'lucide-react';

declare global {
  interface Window {
    webkitSpeechRecognition?: any;
    SpeechRecognition?: any;
  }
}

export function TranscriptionPanel() {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [language, setLanguage] = useState('English');
  const [selectedLanguage, setSelectedLanguage] =
  useState('en-US');
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = selectedLanguage;

    recognition.onresult = (event: any) => {
      let currentTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        currentTranscript += event.results[i][0].transcript;
      }

      setTranscript(currentTranscript);

      if (/[а-яА-Я]/.test(currentTranscript)) {
  setLanguage('Russian');
} else if (/[ء-ي]/.test(currentTranscript)) {
  setLanguage('Arabic');
} else if (/[ሀ-፿]/.test(currentTranscript)) {
  setLanguage('Amharic');
} else {
  setLanguage('English');
}
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognitionRef.current = recognition;
  }, [selectedLanguage]);

  const startListening = () => {
    if (!recognitionRef.current) return;

    setTranscript('');
    setListening(true);
    recognitionRef.current.start();
  };

  const stopListening = () => {
    if (!recognitionRef.current) return;

    recognitionRef.current.stop();
    setListening(false);
  };

  return (
  <div className="capability-card transcription-card">
    {/* Header */}
    <div className="transcription-header">
      <div>
        <strong>Live transcription</strong>
        <p className="muted-text">
          Speech-to-text input for live representative assistance
        </p>
      </div>

      <div className="transcription-controls">

  <select
    value={selectedLanguage}
    onChange={(e) =>
      setSelectedLanguage(e.target.value)
    }
  >
    <option value="en-US">English</option>
    <option value="ar-SA">Arabic</option>
    <option value="ru-RU">Russian</option>
    <option value="am-ET">Amharic</option>
  </select>
      {listening ? (
        <button
          type="button"
          onClick={stopListening}
          className="button button--secondary"
        >
          <MicOff size={16} />
          Stop
        </button>
      ) : (
        <button
          type="button"
          onClick={startListening}
          className="button button--primary"
        >
          <Mic size={16} />
          Start
        </button>
      )}
    </div>
    </div>


    {/* Status row */}
    <div className="transcription-meta">
      <div>
        <strong>Language:</strong> {language}
      </div>

      <div>
        <strong>Status:</strong> {listening ? 'Listening' : 'Idle'}
      </div>
    </div>

    {/* Transcript */}
    <div className="transcription-output">
  {transcript ? (
    <div className="transcript-message">
      <strong>🎙 Live:</strong>
      <p>{transcript}</p>
    </div>
  ) : (
    <div className="transcript-placeholder">
      Start speaking to see live transcription...
    </div>
  )}
</div>

    {/* Footer */}
    <div className="transcription-footer">
  <strong>Supported:</strong>

  <span> English • </span>
  <span> Arabic • </span>
  <span> Amharic • </span>
  <span> Russian </span>
</div>
  </div>
);
}