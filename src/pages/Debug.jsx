import { useState } from 'react';

const API_KEY = import.meta.env.VITE_API_KEY;

function Debug() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function testAPI() {
    setLoading(true);
    try {
      const res = await fetch(`https://v3.football.api-sports.io/fixtures?league=140&season=2024&date=${new Date().toISOString().split('T')[0]}`, {
        headers: { 'x-apisports-key': API_KEY }
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setResult({ error: err.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: 24, color: '#fff' }}>
      <h2>🔧 Debug API</h2>
      <p>API Key detectada: <code style={{ color: '#e94560' }}>{API_KEY ? API_KEY.slice(0, 8) + '...' : 'NO DETECTADA ❌'}</code></p>
      <button onClick={testAPI} style={{ marginTop: 16, padding: '8px 16px', background: '#e94560', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer' }}>
        {loading ? 'Probando...' : 'Probar API'}
      </button>
      {result && (
        <pre style={{ marginTop: 16, background: '#1a1a2e', padding: 16, borderRadius: 8, fontSize: 12, overflow: 'auto', maxHeight: 400 }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}

export default Debug;
