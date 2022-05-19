import dotenv from 'dotenv';

dotenv.config();
import mysql from 'mysql';
import util from 'util';

const dbPool = mysql.createPool({
  connectionLimit: 20,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME,
});

export const dbQuery = util.promisify(dbPool.query).bind(dbPool);
