const express = require('express');
const cors = require('cors');
const { initDB, insertData, getData } = require('./db');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

// JSON-Body parsen
app.use(express.json());

// Middleware
app.use(cors());             // Erlaubt Cross-Origin-Anfragen (CORS)
app.use(express.json());     // JSON-Body parsen

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

app.get('/api/data', async (req, res) => {
  try {
    const allData = await getData();
    res.json(allData);
  } catch (err) {
    console.error('Fehler beim Abrufen:', err);
    res.status(500).send('Abruffehler');
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