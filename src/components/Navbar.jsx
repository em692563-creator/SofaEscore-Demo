import { Link, useLocation } from 'react-router-dom';
import { LEAGUES } from '../services/api';

function Navbar() {
  const location = useLocation();

  return (
    <nav style={{
      background: '#0f0f1a',
      padding: '0 16px',
      borderBottom: '1px solid #2a2a3e',
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      overflowX: 'auto',
    }}>
      <Link to="/" style={{
        padding: '16px 12px',
        color: location.pathname === '/' ? '#e94560' : '#aaa',
        textDecoration: 'none',
        fontWeight: 'bold',
        fontSize: 14,
        whiteSpace: 'nowrap',
        borderBottom: location.pathname === '/' ? '2px solid #e94560' : '2px solid transparent',
      }}>
        🏠 Inicio
      </Link>

      {Object.entries(LEAGUES).map(([key, league]) => (
        <Link key={key} to={`/liga/${key}`} style={{
          padding: '16px 12px',
          color: location.pathname === `/liga/${key}` ? '#e94560' : '#aaa',
          textDecoration: 'none',
          fontSize: 14,
          whiteSpace: 'nowrap',
          borderBottom: location.pathname === `/liga/${key}` ? '2px solid #e94560' : '2px solid transparent',
        }}>
          {league.flag} {league.name}
        </Link>
      ))}
    </nav>
  );
}

export default Navbar;
