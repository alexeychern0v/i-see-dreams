export default function DreamHistory({ dreams }) {
  return (
    <div className="history">
      <h2>Dream History</h2>
      {dreams.length === 0 ? (
        <p>No history yet. Add your firts dream!</p>
      ) : (
        <ul>
          {dreams.map((entry, index) => (
            <li key={index} className="dream-card">
              <p><strong>{entry.date}</strong></p>
              <p><i>{entry.dream}</i></p>
              <p>🔍 {entry.analysis}</p>
              <p>💬 Day phrase: <b>{entry.phrase}</b></p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
