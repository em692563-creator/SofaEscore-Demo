const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = 'https://v3.football.api-sports.io';

const headers = {
  'x-apisports-key': API_KEY,
};

export const LEAGUES = {
  laliga:     { id: 140, name: 'La Liga',        country: 'España',      flag: '🇪🇸' },
  premier:    { id: 39,  name: 'Premier League', country: 'Inglaterra',  flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
  seriea:     { id: 135, name: 'Serie A',        country: 'Italia',      flag: '🇮🇹' },
  bundesliga: { id: 78,  name: 'Bundesliga',     country: 'Alemania',    flag: '🇩🇪' },
  ligue1:     { id: 61,  name: 'Ligue 1',        country: 'Francia',     flag: '🇫🇷' },
};

const currentSeason = new Date().getFullYear();

// Obtener partidos por liga y fecha
export async function getFixtures(leagueId, date) {
  const res = await fetch(
    `${BASE_URL}/fixtures?league=${leagueId}&season=${currentSeason}&date=${date}`,
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

// Obtener últimos partidos finalizados
export async function getLastFixtures(leagueId, last = 10) {
  const res = await fetch(
    `${BASE_URL}/fixtures?league=${leagueId}&season=${currentSeason}&last=${last}`,
    { headers }
  );
  const data = await res.json();
  return data.response || [];
}

// Obtener próximos partidos
export async function getNextFixtures(leagueId, next = 10) {
  const res = await fetch(
    `${BASE_URL}/fixtures?league=${leagueId}&season=${currentSeason}&next=${next}`,
    { headers }
  );
  const data = await res.json();
  return data.response || [];
}
