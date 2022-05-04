import util from 'util';
import express from 'express';
import cors from 'cors';
import { dbPool } from './db/db-connection';
import dotenv from 'dotenv';

dotenv.config({ debug: true });
const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URI,
  })
);
const dbQuery = util.promisify(dbPool.query).bind(dbPool);

// Added code
app.get('/', async (req, res) => {
  const rows = await dbQuery('SELECT * FROM authors LIMIT 1');
  res.json(rows);
});

if (process.env.PROD) {
  app.listen(4000);
}

export const viteNodeApp = app;
