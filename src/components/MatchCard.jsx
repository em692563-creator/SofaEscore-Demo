function MatchCard({ fixture }) {
  const { teams, goals, fixture: info } = fixture;
  const status = info.status.short;
  const isLive = status === '1H' || status === '2H' || status === 'HT';
  const isFinished = status === 'FT';

  const getStatusLabel = () => {
    if (isLive) return `⚡ ${info.status.elapsed}'`;
    if (status === 'HT') return 'Descanso';
    if (isFinished) return 'Finalizado';
    const date = new Date(info.date);
    return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px 16px',
      borderBottom: '1px solid #2a2a3e',
      background: isLive ? '#1a1a2e' : '#16213e',
      borderLeft: isLive ? '3px solid #e94560' : '3px solid transparent',
    }}>
      {/* Equipo local */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, width: '35%' }}>
        <img src={teams.home.logo} alt={teams.home.name} style={{ width: 24, height: 24 }} />
        <span style={{ color: '#eee', fontSize: 14 }}>{teams.home.name}</span>
      </div>

      {/* Marcador */}
      <div style={{ textAlign: 'center', minWidth: 90 }}>
        <div style={{ color: isLive ? '#e94560' : '#fff', fontWeight: 'bold', fontSize: 18 }}>
          {goals.home ?? '-'} - {goals.away ?? '-'}
        </div>
        <div style={{ color: '#888', fontSize: 11, marginTop: 2 }}>{getStatusLabel()}</div>
      </div>

      {/* Equipo visitante */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, width: '35%', justifyContent: 'flex-end' }}>
        <span style={{ color: '#eee', fontSize: 14 }}>{teams.away.name}</span>
        <img src={teams.away.logo} alt={teams.away.name} style={{ width: 24, height: 24 }} />
      </div>
    </div>
  );
}

export default MatchCard;
