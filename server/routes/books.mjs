import express from 'express';
import { getAllBooks, createBook, getBook, updateBook, deleteBook } from '../models/books.mjs';

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
booksRouter.get('/:id', async (request, response) => {
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
        let genre_id = parseInt(request.body.genre_id);
        if (isNaN(genre_id))
        {
            genre_id = 'NULL'
        }
        await createBook(
            newBookData.title,
            newBookData.authors,
            genre_id,
            newBookData.isbn,
            newBookData.cover_image,
            newBookData.quantity_available,
            newBookData.quantity_rented
        );
        response.json({message: 'Book has been successfully created.'})
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

export default booksRouter;
