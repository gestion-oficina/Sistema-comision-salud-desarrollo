import { Database } from "@sqlitecloud/drivers";

export default async function handler(req, res) {

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    let db = null;

    try {

        db = new Database(process.env.SQLITECLOUD_URL);

        const { query, params = [] } = req.body;

        console.log("SQL:", query);

        const resultado = await db.sql(query, ...params);

        return res.status(200).json(resultado);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            error: error.message
        });

    } finally {

        if (db) {

            try {

                await db.close();

                console.log("Conexión SQLite cerrada");

            } catch (e) {

                console.error("Error cerrando conexión:", e);

            }

        }

    }

}
