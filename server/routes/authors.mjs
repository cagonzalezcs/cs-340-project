import express from 'express';
import * as authorsController from '../controllers/authors.mjs';
import { checkAdminAuth, checkAuthToken } from '../utils/middleware.mjs';

const authorsRouter = express.Router();

/**
 * Get all authors
 */
authorsRouter.get('/', checkAuthToken, authorsController.getAllAuthors);

/**
 * Get a single author
 */
authorsRouter.get('/:authorId', checkAuthToken, authorsController.getAuthor);

/**
 * Get all books by a single author
 */
authorsRouter.get('/books/:authorId', checkAuthToken, authorsController.getAuthorBooks);

/**
 * Create an author
 */
authorsRouter.post('/', checkAuthToken, checkAdminAuth, authorsController.createAuthor);

/**
 * Update an author
 */
authorsRouter.put('/:authorId', checkAuthToken, checkAdminAuth, authorsController.updateAuthor);

/**
 * Delete an author
 */
authorsRouter.delete('/:authorId', checkAuthToken, checkAdminAuth, authorsController.deleteAuthor);

export default authorsRouter;
