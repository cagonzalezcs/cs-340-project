import { dbQuery } from '../db/db-connection.mjs';

const getAllAuthors = async () => {
  return await dbQuery(
    `SELECT *
     FROM authors
     ORDER BY authors.id`,
  );
};

export { getAllAuthors };
