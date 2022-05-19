import express from 'express';
import { response } from 'express';
import { getAllBooks, createBook, getBook } from '../models/books.mjs';

const booksRouter = express.Router();

/**
 * Get all books
 */

booksRouter.get('/', async (request, response) => {
    try {
        const allBooks = await getAllBooks();
        response.json(allBooks);
    } catch (error) {
        response.status(500).json({ error }) ;
    }
});

/**
 * Get a single book
 */

booksRouter.get('/:id', async (request, response) => {
    try {
        const getBook = await getBook();
        response.json(getBook);
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
        await createBook(
            newBookData.title,
            newBookData.genre_id,
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

export default booksRouter;