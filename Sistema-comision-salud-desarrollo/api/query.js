import { Database } from "@sqlitecloud/drivers";

export default async function handler(req, res) {

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");


  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }


  try {

    const db = new Database(process.env.SQLITECLOUD_URL);

    const { query, params = [] } = req.body;


    console.log("SQL RECIBIDO:", query);
    console.log("PARAMETROS:", params);


    const resultado = await db.sql(query, ...params);


    console.log("RESULTADO:", resultado);


    return res.status(200).json(resultado);


  } catch(error) {

    console.error("ERROR SQLITE CLOUD:", error.message);


    return res.status(500).json({
      error: error.message
    });

  }

}
