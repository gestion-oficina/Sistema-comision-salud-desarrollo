import { Database } from "@sqlitecloud/drivers";

export default async function handler(req, res) {

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");


  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }


  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Método no permitido"
    });
  }


  try {

    const db = new Database(process.env.SQLITECLOUD_URL);


    const { query, params = [] } = req.body;


    if (!query) {
      return res.status(400).json({
        error: "No se recibió ninguna consulta SQL"
      });
    }


    const resultado = await db.sql(
      query,
      params
    );


    return res.status(200).json(resultado);


   } catch(error) {

    console.error("ERROR SQLITE CLOUD:", error);

    return res.status(500).json({
      error: error.message,
      detalle: String(error)
    });

  }

}
