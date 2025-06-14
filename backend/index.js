import express from 'express';
import { insertData } from './db.js';

const app = express();
const port = process.env.PORT || 3000;

// JSON-Body parsen
app.use(express.json());

// CORS (optional, falls Frontend anderswo gehostet wird)
// import cors from 'cors';
// app.use(cors());

app.post('/api/data', async (req, res) => {
  try {
    const { date, text1, text2, text3 } = req.body;
    if (!date || !text1 || !text2 || !text3) {
      return res.status(400).json({ error: 'Alle Felder sind erforderlich.' });
    }

    const result = await insertData({ date, text1, text2, text3 });
    res.status(201).json({ success: true, id: result.id, created_at: result.created_at });
  } catch (error) {
    console.error('Insert Error:', error);
    res.status(500).send('Datenbankfehler');
  }
});

app.listen(port, async () => {
  await initDB();
  console.log(`Server läuft auf Port ${port}`);
});