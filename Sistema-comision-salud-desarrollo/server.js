import express from 'express';
import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static('.'));

const sql = neon(process.env.DATABASE_URL);

app.post('/api/query', async (req, res) => {
  try {
    const { query, params = [] } = req.body;
    const resultado = await sql(query, params);
    res.json(resultado);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
