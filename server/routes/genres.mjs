import express from 'express';
import { getAllGenres, getGenre, getGenresPage, createGenre, updateGenre, deleteGenre } from '../models/genres.mjs';

const genresRouter = express.Router();

/**
 * Read All Genres
 */
genresRouter.get('/:pageNumber?/:perPage?', async (request, response) => {
  try {
    if (request.params.pageNumber) {
      const pageNumber = Number(request.params.pageNumber);
      const perPage = Number(request.params.perPage) || 20;
      const pagedGenres = await getGenresPage(pageNumber, perPage);
      return response.json(pagedGenres);
    }

    const genres = await getAllGenres();
    return response.json(genres);
  } catch (error) {
    response.status(500).json(error);
  }
});

/**
 * Get a single genre
 */
genresRouter.get('/:id', async (request, response) => {
  try {
    const getGenre = await getGenre();
    response.json(getGenre);
  } catch (error) {
    response.status(500).json({ error });
  }
});

/**
 * Create genre
 */
genresRouter.post('/', async (request, response) => {
  try {
    const newGenreData = request.body;
    await createGenre(
      newGenreData.name
    );
    response.json({message: 'Genre has been successfully created.'})
  } catch (error) {
    response.status(500).json({ error })
  }
});

/**
 * Update genre
 */
genresRouter.put('/:genreId', async (request, response) => {
  try {
    const genreId = request.params.genreId;
    const genreData = request.body;
    await updateGenre(
      genreId, 
      genreData.name
    ); 
    response.json({ message: 'Genre has been successfully updated.' });
  } catch (error) {
    response.status(500).json({ error });
  }
});

/**
 * Delete a genre
 */
genresRouter.delete('/:genreId', async (request, response) => {
  try {
    const genreId = request.params.genreId;
    await deleteGenre(genreId);
    response.json({ message: 'Genre has been successfully deleted.' });
  } catch (error) {
      response.status(500).json({ error });
  }
});


export default genresRouter;
