import mysql from 'mysql';

export const dbConnection = mysql.createConnection({
  host: import.meta.env.DB_HOST,
  user: import.meta.env.DB_USER,
  password: import.meta.env.DB_PASSWORD || '',
  database: import.meta.env.DB_NAME,
});
