import util from 'util';
import express from 'express';
import cors from 'cors';
import { dbConnection } from './db/db-connection';

const app = express();
app.use(
  cors({
    origin: import.meta.env.CLIENT_URI,
  })
);
const dbQuery = util.promisify(dbConnection.query).bind(dbConnection);

// Added code
app.get('/', async (req, res) => {
  const rows = await dbQuery('SELECT * FROM authors LIMIT 1');
  res.json(rows);
});

if (process.env.PROD) {
  app.listen(4000);
}

export const viteNodeApp = app;
