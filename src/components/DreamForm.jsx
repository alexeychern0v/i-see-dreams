import { useState } from 'react';

export default function DreamForm({ onSave }) {
  const [dream, setDream] = useState('');
  const [result, setResult] = useState('');
  const [phrase, setPhrase] = useState('');

  const handleAnalyze = () => {
    if (!dream.trim()) return;

    const text = dream.toLowerCase();
    let analysis = 'This dream doesn’t match any common patterns — and that’s okay. Sometimes, dreams reflect your unique emotional state or moments from your day that words can’t fully capture. Try describing it again, or simply take a moment to reflect on how you felt when you woke up. That matters too.';

    if (text.includes('water') || text.includes('ocean') || text.includes('lake') || text.includes('river')) {
      analysis = 'Water in dreams often represents emotions, unconscious thoughts, or life changes. It can symbolize cleansing, renewal, or emotional turbulence.';
    } else if (text.includes('fly') || text.includes('flying') || text.includes('flight') || text.includes('flyed')) {
      analysis = 'Flying dreams typically represent freedom, ambition, and desire to escape limitations. They may indicate confidence and control over your life.';
    } else if (text.includes('falling') || text.includes('fell') || text.includes('fall')) {
      analysis = 'Falling often reflects insecurity, fear of failure, or losing control. It can be a sign of overwhelm or instability.';
    } else if (text.includes('chase') || text.includes('running from') || text.includes('pursued')) {
      analysis = 'Being chased in dreams can indicate avoidance of something in your waking life. It may represent anxiety, stress, or unresolved issues that you are trying to escape.';
    } else if (text.includes('death') || text.includes('dying') || text.includes('dead')) {
      analysis = 'Dreams about death can symbolize transformation, change, or the end of a phase in your life. They often represent new beginnings or the need to let go of something that no longer serves you.';
    } else if (text.includes('lost') || text.includes('lost in') || text.includes('losting')) {
      analysis = 'Feeling lost in a dream can reflect confusion, uncertainty, or a lack of direction in your waking life. It may indicate a need to find clarity or purpose.';
    }

    const day_phrases = [
      'Trust the whispers of your inner world — they know what’s next.',
      'Growth often looks like stillness. Be gentle with yourself today.',
      'Even your quietest feelings carry great truths.',
      'What seemed strange in the night may guide you in the light.',
      'Release what no longer fits. You are allowed to change.',
      'Your dreams remember parts of you that waking forgot.',
      'Breathe deeply — clarity follows chaos.',
      'Let emotion flow through you, not define you.',
      'You already hold the key. Now open the door.',
      'Transformation is not loud. Trust the soft shifts.',
      'Start light. You don’t need to carry everything into today.',
      'The stars inside you are aligning — even if you can’t see it yet.',
      'Not everything needs to be understood right away. Let it unfold.',
      'Some lessons repeat until we listen. What’s echoing today?',
      'What you felt was real. Now choose what you’ll carry forward.'
    ];
    const daily = day_phrases[Math.floor(Math.random() * day_phrases.length)];

    setResult(analysis);
    setPhrase(daily);

    onSave({
      date: new Date().toLocaleString(),
      dream,
      analysis,
      phrase: daily,
    });

    setDream('');
  };

  return (
    <div className="form-container">
      <h2>Describe your last dream</h2>
      <textarea
        value={dream}
        onChange={(e) => setDream(e.target.value)}
        rows={5}
        placeholder="I was on a beach, flying over the ocean..."
      />
      <button onClick={handleAnalyze}>Interpret</button>

      {result && (
        <div className="result">
          <h3>🔍 Dream Interpretation:</h3>
          <p>{result}</p>
          <h3>💬 Phrase of the day:</h3>
          <p>{phrase}</p>
        </div>
      )}
    </div>
  );
}
