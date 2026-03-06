export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { path, ...queryParams } = req.query;
  const cleanPath = Array.isArray(path) ? path.join('/') : (path || '');
  
  const queryString = new URLSearchParams(queryParams).toString();
  const fullUrl = `https://api.football-data.org/v4/${cleanPath}${queryString ? '?' + queryString : ''}`;

  try {
    const response = await fetch(fullUrl, {
      headers: {
        'X-Auth-Token': process.env.VITE_FOOTBALL_API_KEY,
      },
    });
    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
