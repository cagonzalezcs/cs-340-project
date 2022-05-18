import express from 'express';
import {getAllBooks, updateBook, deleteBook} from '../models/books.mjs';

const booksRouter = express.Router();

/**
 * Create a Book
 */

/**
 * Read All Books
 */
// TODO: Consider setting up limits on how many books can be requested at a time. Would need to flesh this out to allow for pagination on different routes.
booksRouter.get('/', async (request, response) => {
  try {
    const books = await getAllBooks();
    response.json(books);
  } catch (error) {
    response.status(500).json({ error });
  }
});

/**
 * Read a Book by bookId
 */

/**
 * Update a Book
 */
booksRouter.put('/update/:bookId', async(request, response) => {
  try {
    const bookId = request.params.bookId;
    const bookData = request.body;
    console.log(bookData);

    // Update Book
    await updateBook(
      bookId,
      bookData.title,
      bookData.genre_id,
      bookData.isbn,
      bookData.cover_image,
      bookData.quantity_available,
      bookData.quantity_rented
    );

    response.json({message: 'Book has been successfully updated.'})
  } catch (error) {
    response.status(500).json({ error });
  }
});

/**
 * Delete a Book
 */
booksRouter.delete('/delete/:bookId', async (request, response) => {
  try {
    const bookId = request.params.bookId;
    await deleteBook(bookId);
    response.json({message: 'Book has been successfully deleted.'})
  } catch (error) {
    response.status(500).json({ error });
  }
});

export default booksRouter;
