import { useEffect, useState } from 'react';
import { LEAGUES, getLiveFixtures, getFixtures } from '../services/api';
import MatchCard from '../components/MatchCard';

function Home() {
  const [liveMatches, setLiveMatches] = useState([]);
  const [todayMatches, setTodayMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    async function fetchAll() {
      setLoading(true);
      try {
        const leagueIds = Object.values(LEAGUES).map(l => l.id);

        const [liveResults, todayResults] = await Promise.all([
          Promise.all(leagueIds.map(id => getLiveFixtures(id))),
          Promise.all(leagueIds.map(id => getFixtures(id, today))),
        ]);

        setLiveMatches(liveResults.flat());
        setTodayMatches(todayResults.flat());
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchAll();
    const interval = setInterval(fetchAll, 60000); // refresca cada minuto
    return () => clearInterval(interval);
  }, []);

  if (loading) return <p style={{ color: '#aaa', padding: 24 }}>Cargando partidos...</p>;

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 16 }}>
      {/* En vivo */}
      {liveMatches.length > 0 && (
        <section style={{ marginBottom: 32 }}>
          <h2 style={{ color: '#e94560', marginBottom: 12 }}>⚡ En Vivo</h2>
          {liveMatches.map(f => <MatchCard key={f.fixture.id} fixture={f} />)}
        </section>
      )}

      {/* Partidos de hoy */}
      <section>
        <h2 style={{ color: '#fff', marginBottom: 12 }}>📅 Hoy — {today}</h2>
        {todayMatches.length === 0
          ? <p style={{ color: '#888' }}>No hay partidos programados hoy.</p>
          : todayMatches.map(f => <MatchCard key={f.fixture.id} fixture={f} />)
        }
      </section>
    </div>
  );
}

export default Home;
