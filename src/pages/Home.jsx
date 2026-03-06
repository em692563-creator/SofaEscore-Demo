import { useEffect, useState } from 'react';
import { getAllMatchesToday, getDateString } from '../services/api';
import MatchCard from '../components/MatchCard';

function Home() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const today = getDateString(0);

  useEffect(() => {
    async function fetchAll() {
      setLoading(true);
      try {
        const all = await getAllMatchesToday();
        setMatches(all);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
  }, []);

  const liveMatches = matches.filter(m =>
    m.status === 'IN_PLAY' || m.status === 'PAUSED' || m.status === 'LIVE'
  );
  const otherMatches = matches.filter(m =>
    m.status !== 'IN_PLAY' && m.status !== 'PAUSED' && m.status !== 'LIVE'
  );

  if (loading) return (
    <div style={{ padding: 24, color: '#aaa', textAlign: 'center' }}>
      <p>⏳ Cargando partidos de hoy...</p>
    </div>
  );

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 16 }}>
      {liveMatches.length > 0 && (
        <section style={{ marginBottom: 32 }}>
          <h2 style={{ color: '#e94560', marginBottom: 12 }}>⚡ En Vivo</h2>
          {liveMatches.map(m => <MatchCard key={m.id} match={m} />)}
        </section>
      )}
      <section>
        <h2 style={{ color: '#fff', marginBottom: 12 }}>📅 Hoy — {today}</h2>
        {otherMatches.length === 0
          ? <p style={{ color: '#888' }}>No hay más partidos programados hoy.</p>
          : otherMatches.map(m => <MatchCard key={m.id} match={m} />)
        }
      </section>
    </div>
  );
}

export default Home;
