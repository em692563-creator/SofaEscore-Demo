function OddsDisplay({ odds }) {
  if (!odds) return null;

  const btn = (label, value) => (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      background: '#0f0f1a', borderRadius: 8, padding: '4px 12px',
      border: '1px solid #2a2a3e', minWidth: 52,
    }}>
      <span style={{ color: '#888', fontSize: 10 }}>{label}</span>
      <span style={{ color: '#e94560', fontWeight: 'bold', fontSize: 14 }}>{value?.toFixed(2)}</span>
    </div>
  );

  return (
    <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginTop: 8 }}>
      {btn('1', odds.home)}
      {odds.draw && btn('X', odds.draw)}
      {btn('2', odds.away)}
    </div>
  );
}

export default OddsDisplay;
