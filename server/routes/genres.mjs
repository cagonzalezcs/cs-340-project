import express from 'express';
import * as genresController from '../controllers/genres.mjs';
import { checkAdminAuth, checkAuthToken } from '../utils/middleware.mjs';

const genresRouter = express.Router();

/**
 * Read All Genres
 */
genresRouter.get('/:pageNumber?/:perPage?', checkAuthToken, genresController.getAllGenres);

/**
 * Get a single genre
 */
genresRouter.get('/:genreId', checkAuthToken, genresController.getGenre);

/**
 * Create genre
 */
genresRouter.post('/', checkAuthToken, checkAdminAuth, genresController.createGenre);

/**
 * Update genre
 */
genresRouter.put('/:genreId', checkAuthToken, checkAdminAuth, genresController.updateGenre);

/**
 * Delete a genre
 */
genresRouter.delete('/:genreId', checkAuthToken, checkAdminAuth, genresController.deleteGenre);


export default genresRouter;
