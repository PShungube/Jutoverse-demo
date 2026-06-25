import { useState } from 'react';

type QueryComposerProps = {
  onSubmit: (question: string) => void;
};

export function QueryComposer({ onSubmit }: QueryComposerProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = () => {
    if (!query.trim()) return;

    onSubmit(query);
    setQuery('');
  };

  return (
    <div
      style={{
        display: 'flex',
        gap: '0.75rem',
        marginTop: '1rem',
      }}
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ask a policy question..."
        style={{
          flex: 1,
          padding: '0.75rem',
        }}
      />

      <button type="button" onClick={handleSubmit}>
        Send
      </button>
    </div>
  );
}