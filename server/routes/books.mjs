import express from 'express';
import {
  getAllBooks,
  createBook,
  getBook,
  updateBook,
  deleteBook,
  searchBooksByTitle,
  searchBooksByGenre,
  searchBooksByAuthor,
} from '../models/books.mjs';

const booksRouter = express.Router();

/**
 * Get all books
 */
booksRouter.get('/', async (request, response) => {
  try {
    const allBooks = await getAllBooks();
    response.json(allBooks);
  } catch (error) {
    response.status(500).json({ error });
  }
});

/**
 * Get a single book
 */
booksRouter.get('/:bookId', async (request, response) => {
  try {
    const bookId = request.params.bookId;
    const book = await getBook(bookId);
    response.json(book);
  } catch (error) {
    response.status(500).json({ error });
  }
});

/**
 * Create book
 */

booksRouter.post('/', async (request, response) => {
  try {
    const newBookData = request.body;
    let genreId = parseInt(newBookData.genre_id);
    if (isNaN(genreId)) {
      genreId = 'NULL';
    }
    await createBook(
      newBookData.title,
      newBookData.authors,
      genreId,
      newBookData.isbn,
      newBookData.cover_image,
      newBookData.quantity_available,
      newBookData.quantity_rented,
    );
    response.json({ message: 'Book has been successfully created.' });
  } catch (error) {
    response.status(500).json({ error });
  }
});

/**
 * Update a Book
 */
booksRouter.put('/:bookId', async (request, response) => {
  try {
    const bookId = request.params.bookId;
    const bookData = request.body;

    // Update Book
    await updateBook(
      bookId,
      bookData.title,
      bookData.genre_id,
      bookData.isbn,
      bookData.cover_image,
      bookData.quantity_available,
      bookData.quantity_rented,
      bookData.authors,
    );

    response.json({ message: 'Book has been successfully updated.' });
  } catch (error) {
    response.status(500).json({ error });
  }
});

/**
 * Delete a Book
 */
booksRouter.delete('/:bookId', async (request, response) => {
  try {
    const bookId = request.params.bookId;
    await deleteBook(bookId);
    response.json({ message: 'Book has been successfully deleted.' });
  } catch (error) {
    response.status(500).json({ error });
  }
});

/**
 * Search Title
 */
booksRouter.get('/search/title/:bookTitle', async (request, response) => {
  try {
    const bookTitle = request.params.bookTitle;
    const foundBooks = await searchBooksByTitle(bookTitle);
    response.json(foundBooks);
  } catch (error) {
    response.status(500).json({ error });
  }
});

/**
 * Filter Genres
 */
booksRouter.get('/search/genre/:genreId', async (request, response) => {
  try {
    const genreId = request.params.genreId;
    const foundBooks = await searchBooksByGenre(genreId);
    response.json(foundBooks);
  } catch (error) {
    response.status(500).json({ error });
  }
});

/**
 * Filter by Author
 */
booksRouter.get('/search/author/:authorId', async (request, response) => {
  try {
    const authorId = request.params.authorId;
    const foundBooks = await searchBooksByAuthor(authorId);
    response.json(foundBooks);
  } catch (error) {
    response.status(500).json({ error });
  }
});

export default booksRouter;
