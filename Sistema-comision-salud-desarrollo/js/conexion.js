// Ejemplo correcto para la mayoría de las versiones modernas de mssql
const sql = require('mssql');

async function consultarBaseDatos(query) {
    try {
        // 1. Crear una conexión o usar una existente
        const pool = await sql.connect(configuracion); 
        
        // 2. Ejecutar la query a través del objeto 'pool', no del 'sql' directamente
        const result = await pool.request().query(query);
        
        return result.recordset;
    } catch (err) {
        console.error("Error en la consulta:", err);
        throw err;
    }
}