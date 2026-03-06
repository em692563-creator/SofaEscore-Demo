import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTeamRecentMatches, getTeamUpcomingMatches } from '../services/api';
import MatchCard from '../components/MatchCard';

const TABS = ['Últimos partidos', 'Próximos partidos'];

function Team() {
  const { teamId } = useParams();
  const navigate = useNavigate();
  const [tab, setTab] = useState('Últimos partidos');
  const [matches, setMatches] = useState([]);
  const [teamInfo, setTeamInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const requestId = useRef(0);

  // Obtener info del equipo del primer partido
  useEffect(() => {
    const currentId = ++requestId.current;
    async function fetchMatches() {
      setLoading(true);
      setMatches([]);
      try {
        let data = [];
        if (tab === 'Últimos partidos')  data = await getTeamRecentMatches(teamId);
        if (tab === 'Próximos partidos') data = await getTeamUpcomingMatches(teamId);
        if (currentId !== requestId.current) return;

        setMatches(data);

        // Extraer info del equipo del primer partido
        if (data.length > 0 && !teamInfo) {
          const m = data[0];
          const isHome = String(m.homeTeam?.id) === String(teamId);
          const team = isHome ? m.homeTeam : m.awayTeam;
          setTeamInfo(team);
        }
      } catch (err) {
        console.error(err);
        if (currentId === requestId.current) setMatches([]);
      } finally {
        if (currentId === requestId.current) setLoading(false);
      }
    }
    fetchMatches();
  }, [teamId, tab]);

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 16 }}>

      {/* Cabecera del equipo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
        <button
          onClick={() => navigate(-1)}
          style={{ background: '#2a2a3e', border: 'none', color: '#aaa', padding: '8px 12px', borderRadius: 8, cursor: 'pointer', fontSize: 16 }}
        >
          ← Volver
        </button>
        {teamInfo?.crest && (
          <img src={teamInfo.crest} alt={teamInfo.name} style={{ width: 48, height: 48, objectFit: 'contain' }} />
        )}
        <h1 style={{ color: '#fff', fontSize: 22 }}>{teamInfo?.name || 'Equipo'}</h1>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding: '8px 16px', borderRadius: 20, border: 'none', cursor: 'pointer',
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
          : matches.map(m => <MatchCard key={m.id} match={m} />)
      }
    </div>
  );
}

export default Team;
