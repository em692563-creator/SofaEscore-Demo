import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { LEAGUES, getLiveFixtures, getFixturesByRound, getFixtures } from '../services/api';
import MatchCard from '../components/MatchCard';

const TABS = ['En Vivo', 'Jornada Actual', 'Hoy'];

function League() {
  const { leagueKey } = useParams();
  const league = LEAGUES[leagueKey];
  const [tab, setTab] = useState('Jornada Actual');
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (!league) return;
    async function fetchMatches() {
      setLoading(true);
      try {
        let data = [];
        if (tab === 'En Vivo')         data = await getLiveFixtures(league.id);
        if (tab === 'Jornada Actual')  data = await getFixturesByRound(league.id);
        if (tab === 'Hoy')             data = await getFixtures(league.id, today);
        setMatches(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchMatches();
  }, [leagueKey, tab]);

  if (!league) return <p style={{ color: '#aaa', padding: 24 }}>Liga no encontrada.</p>;

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 16 }}>
      <h1 style={{ color: '#fff', marginBottom: 16 }}>
        {league.flag} {league.name}
      </h1>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding: '8px 16px',
            borderRadius: 20,
            border: 'none',
            cursor: 'pointer',
            background: tab === t ? '#e94560' : '#2a2a3e',
            color: tab === t ? '#fff' : '#aaa',
            fontWeight: tab === t ? 'bold' : 'normal',
          }}>
            {t}
          </button>
        ))}
      </div>

      {/* Partidos */}
      {loading
        ? <p style={{ color: '#aaa' }}>Cargando...</p>
        : matches.length === 0
          ? <p style={{ color: '#888' }}>No hay partidos disponibles.</p>
          : matches.map(f => <MatchCard key={f.fixture.id} fixture={f} />)
      }
    </div>
  );
}

export default League;
