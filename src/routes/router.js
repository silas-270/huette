import { Router } from 'express';
import { pool } from '../db/db.js';
const router = Router();

// GET / -> Alle Einträge zurückgeben
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM entries ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    console.error('Fehler beim Laden der Einträge:', err);
    res.status(500).json({ error: 'Interner Serverfehler' });
  }
});

// POST / -> Neuen Eintrag anlegen
router.post('/', async (req, res) => {
  const { date, persons, task, time } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO entries(date, persons, task, time) VALUES($1, $2, $3, $4) RETURNING *',
      [date, persons, task, time]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Fehler beim Anlegen des Eintrags:', err);
    res.status(500).json({ error: 'Interner Serverfehler' });
  }
});

// PUT /:id -> Bestehenden Eintrag aktualisieren
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { date, persons, task, time } = req.body;
  try {
    const result = await pool.query(
      'UPDATE entries SET date = $1, persons = $2, task = $3, time = $4 WHERE id = $5 RETURNING *',
      [date, persons, task, time, id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Eintrag nicht gefunden' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Fehler beim Aktualisieren des Eintrags:', err);
    res.status(500).json({ error: 'Interner Serverfehler' });
  }
});

// DELETE /:id -> Eintrag löschen
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM entries WHERE id = $1', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Eintrag nicht gefunden' });
    }
    res.status(204).send();
  } catch (err) {
    console.error('Fehler beim Löschen des Eintrags:', err);
    res.status(500).json({ error: 'Interner Serverfehler' });
  }
});

export default router;