import { useState } from 'react';

export function FeedbackControls() {
  const [selected, setSelected] = useState('');

  return (
    <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
      <button onClick={() => setSelected('helpful')}>
        👍 Helpful
      </button>

      <button onClick={() => setSelected('insufficient')}>
        👎 Insufficient
      </button>

      <button onClick={() => setSelected('escalated')}>
        ⚠ Escalate
      </button>

      {selected && (
        <span>
          Selected: {selected}
        </span>
      )}
    </div>
  );
}