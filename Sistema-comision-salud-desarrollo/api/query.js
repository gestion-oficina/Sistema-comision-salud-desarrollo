import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  // Permitir CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Responder a las peticiones OPTIONS
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Solo permitir POST
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Método no permitido",
    });
  }

  try {
    const { query, params = [] } = req.body;

    if (!query) {
      return res.status(400).json({ error: "No se proporcionó ninguna consulta SQL." });
    }

    const sql = neon(process.env.DATABASE_URL);

    // Ejecutar consulta en Neon
    const resultado = await sql(query, params);

    return res.status(200).json(resultado);

  } catch (error) {
    console.error("ERROR NEON:", error);

    return res.status(500).json({
      error: error.message,
    });
  }
}
