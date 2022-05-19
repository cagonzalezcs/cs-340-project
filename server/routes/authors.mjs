import express from 'express';
import { response } from 'express';
import { getAllAuthors } from '../models/authors.mjs';

const authorsRouter = express.Router();

/**
 * Get all authors
 */

authorsRouter.get('/', async (request, response) => {
  try {
    const allAuthors = await getAllAuthors();
    response.json(allAuthors);
  } catch (error) {
    response.status(500).json({ error });
  }
});

export default authorsRouter;
