const express = require('express');
const { initDB, insertData } = require('./db');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// JSON-Body parsen
app.use(express.json());

// Optional: CORS aktivieren
// const cors = require('cors');
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
  try {
    await initDB(); // Tabelle prüfen/erstellen
    console.log(`Server läuft auf Port ${port}`);
  } catch (err) {
    console.error('Fehler beim Initialisieren der DB:', err);
    process.exit(1);
  }
});