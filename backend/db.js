const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

// PostgreSQL-Verbindung (Railway setzt DATABASE_URL automatisch)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

/**
 * Erstellt die Tabelle, falls sie nicht existiert.
 */
async function initDB() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS data_entries (
      id SERIAL PRIMARY KEY,
      entry_date DATE NOT NULL,
      text1 TEXT NOT NULL,
      text2 TEXT NOT NULL,
      text3 TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `;
  await pool.query(createTableQuery);
}

/**
 * Insert-Funktion für neue Datensätze.
 */
async function insertData({ date, text1, text2, text3 }) {
  const query = `
    INSERT INTO data_entries (entry_date, text1, text2, text3)
    VALUES ($1, $2, $3, $4)
    RETURNING id, created_at;
  `;
  const values = [date, text1, text2, text3];
  const res = await pool.query(query, values);
  return res.rows[0];
}

module.exports = { initDB, insertData };