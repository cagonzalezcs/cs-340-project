import { dbQuery } from '../db/db-connection.mjs';

const getAllGenres = async () => {
  return await dbQuery(
    `SELECT *
     FROM genres
     ORDER BY genres.id`,
  );
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

const getGenre = async (genreId) => {
  if (!genreId) {
    throw 'Genre Id is a required parameter to get a genre';
  }
  return await dbQuery(
    `SELECT * 
    FROM genres 
    WHERE genres.id = ?
    ORDER BY genres.id`, 
    [genreId]);
};

const getGenreIdByName = async (genreName) => {
  if (!genreName) {
    throw 'Genre name is a required parameter to get a genre id';
  }
  return await dbQuery(
    `SELECT genres.id
    FROM genres
    WHERE genres.name = ?`,
    [genreName]
  )
};


const createGenre = async (name) => {
  return await dbQuery(
    `INSERT INTO genres (name) 
    VALUES (?)`, 
    [name],
  );
};

const updateGenre = async(genreId, name) => {
  if (!genreId) {
    throw 'Genre Id is a required parameter to update a genre.';
  }
  let genreRecord = await getGenre(genreId); 
  genreRecord = genreRecord[0]
  if (!genreRecord) {
    throw 'Genre not found, unable to update genre.';
  }
  const updatedName = name || genreRecord.name;
  return await dbQuery(
    `UPDATE genres 
    SET genres.name = ?
    WHERE genres.id = ?`,
    [updatedName, genreId]
  )
};

const deleteGenre = async (genreId) => {
  if(!genreId) {
    throw 'Genre Id is a required parameter to delete a genre.';
  }
  return await dbQuery('DELETE FROM genres WHERE genres.id = ?', [genreId]);
};


export { getAllGenres, getGenresPage, getGenre, getGenreIdByName, createGenre, updateGenre, deleteGenre };
