import { useState } from 'react';

export function QueryComposer() {
  const [query, setQuery] = useState('');

  const handleSubmit = () => {
    if (!query.trim()) return;

    alert(`Question submitted: ${query}`);
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