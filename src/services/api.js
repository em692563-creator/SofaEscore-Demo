const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = 'https://v3.football.api-sports.io';

const headers = { 'x-apisports-key': API_KEY };

export const LEAGUES = {
  laliga:     { id: 140, name: 'La Liga',        country: 'España',     flag: '🇪🇸' },
  premier:    { id: 39,  name: 'Premier League', country: 'Inglaterra', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
  seriea:     { id: 135, name: 'Serie A',        country: 'Italia',     flag: '🇮🇹' },
  bundesliga: { id: 78,  name: 'Bundesliga',     country: 'Alemania',   flag: '🇩🇪' },
  ligue1:     { id: 61,  name: 'Ligue 1',        country: 'Francia',    flag: '🇫🇷' },
};

// Obtener partidos por liga y fecha
export async function getFixtures(leagueId, date) {
  const res = await fetch(
    `${BASE_URL}/fixtures?league=${leagueId}&season=2024&date=${date}`,
    { headers }
  );
  const data = await res.json();
  return data.response || [];
}

// Obtener partidos en vivo
export async function getLiveFixtures(leagueId) {
  const res = await fetch(
    `${BASE_URL}/fixtures?league=${leagueId}&live=all`,
    { headers }
  );
  const data = await res.json();
  return data.response || [];
}

// Obtener partidos de una jornada completa (rango de fechas)
export async function getFixturesByRound(leagueId, season = 2024) {
  const res = await fetch(
    `${BASE_URL}/fixtures/rounds?league=${leagueId}&season=${season}&current=true`,
    { headers }
  );
  const roundData = await res.json();
  const round = roundData.response?.[0];
  if (!round) return [];

  const res2 = await fetch(
    `${BASE_URL}/fixtures?league=${leagueId}&season=${season}&round=${encodeURIComponent(round)}`,
    { headers }
  );
  const data = await res2.json();
  return data.response || [];
}
