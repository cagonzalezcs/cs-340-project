import 'dotenv/config'
import util from 'util';
import express from 'express';
import cors from 'cors';
import { dbPool } from './db/db-connection.mjs';

const BASE_URL = '/api/'
const app = express();
const router = express.Router();
const dbQuery = util.promisify(dbPool.query).bind(dbPool);

app.use(BASE_URL, router);
router.use(
  cors({
    origin: process.env.CLIENT_URI,
  })
);

router.get('/', async (req, res) => {
  const rows = await dbQuery('SELECT * FROM authors LIMIT 1');
  res.json(rows);
});

router.get('/test', (req, res) => {
  res.send('Testing');
});

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Listening to port ${process.env.SERVER_PORT}`);
});
