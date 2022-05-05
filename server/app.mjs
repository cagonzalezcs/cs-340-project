import 'dotenv/config'
import util from 'util';
import express from 'express';
import cors from 'cors';
import { dbPool } from './db/db-connection.mjs';

const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URI,
  })
);
const dbQuery = util.promisify(dbPool.query).bind(dbPool);

app.get('/', async (req, res) => {
  const rows = await dbQuery('SELECT * FROM authors LIMIT 1');
  res.json(rows);
});

app.get('/test', (req, res) => {
  res.send('Testing');
});

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Listening to port ${process.env.SERVER_PORT}`);
});
