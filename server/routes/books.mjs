import express from 'express';
import * as booksController from '../controllers/books.mjs';
import { checkAdminAuth, checkAuthToken } from '../utils/middleware.mjs';

const booksRouter = express.Router();

/**
 * Get all books
 */
booksRouter.get('/', checkAuthToken, booksController.getAllBooks);

/**
 * Get a single book
 */
booksRouter.get('/:bookId', checkAuthToken, booksController.getBook);

/**
 * Create book
 */
booksRouter.post('/', checkAuthToken, checkAdminAuth, booksController.createBook);

/**
 * Update a Book
 */
booksRouter.put('/:bookId', checkAuthToken, checkAdminAuth, booksController.updateBook);

/**
 * Delete a Book
 */
booksRouter.delete('/:bookId', checkAuthToken, checkAdminAuth, booksController.deleteBook);

/**
 * Search Title
 */
booksRouter.get('/search/title/:bookTitle', checkAuthToken, booksController.searchBooksByTitle);

/**
 * Search Genres
 */
booksRouter.get('/search/genre/:genreId', checkAuthToken, booksController.searchBooksByGenre);

/**
 * Search by Author
 */
booksRouter.get('/search/author/:authorId', checkAuthToken, booksController.searchBooksByAuthor);

/**
 * Search by Keyword
 */
booksRouter.get('/search/keyword/:keyword', booksController.searchBooksByKeyword);

export default booksRouter;
