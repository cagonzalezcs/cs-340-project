import express from 'express'; 
import { response } from 'express'; 
import { getAllGenres  } from '../models/genres.mjs';

const genresRouter = express.Router(); 

/**
 * Get all genres
 */

genresRouter.get('/', async (request, response) => {
    try {
        const allGenres = await getAllGenres();
        response.json(allGenres);
    } catch (error) {
        response.status(500).json({ error });
    }
});

export default genresRouter;