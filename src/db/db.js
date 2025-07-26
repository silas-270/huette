import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
});

// Tabellen-Erstellung
const createTableIfNotExist = async () => {
    await pool.query(`
    CREATE TABLE IF NOT EXISTS entries (
        id SERIAL PRIMARY KEY,
        date TEXT,
        persons TEXT,
        task TEXT,
        time TEXT
    );`
    );
};

export {
    pool,
    createTableIfNotExist,
};