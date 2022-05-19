import { dbQuery } from '../db/db-connection.mjs';

const getAllGenres = async () => {
    return await dbQuery(
        `SELECT * FROM genres`
    )
};

const getGenresPage = async (pageNumber, perPage) => {
  const pageOffset = (pageNumber - 1) * perPage;

  return await dbQuery(
    `SELECT *
     FROM genres
     ORDER BY genres.id
     LIMIT ?, ?`,
    [pageOffset, perPage],
  );
};

export { getAllGenres, getGenresPage };
