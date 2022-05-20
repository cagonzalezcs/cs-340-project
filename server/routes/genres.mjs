import express from 'express';
import { getAllGenres, getGenresPage } from '../models/genres.mjs';

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

export default genresRouter;
