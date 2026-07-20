// api/query.js
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  if (req.method !== 'POST') return res.status(405).end();

  try {
    const { query, params } = req.body;
    
    // Usamos el endpoint HTTP de Neon (más estable para Vercel)
    const response = await fetch(process.env.DATABASE_URL, {
      method: 'POST',
      body: JSON.stringify({ query, params }),
      headers: { 'Content-Type': 'application/json' }
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}