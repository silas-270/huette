import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import router from './src/routes/router.js';
import { createTableIfNotExist } from './src/db/db.js';

async function initializeDatabase() {
  await createTableIfNotExist();
  console.log('Datenbanktabellen initialisiert.');
}
initializeDatabase().catch(err => {
  console.error('DB-Init-Fehler:', err);
  process.exit(1);
});

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api/v1/entries', router);

app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
