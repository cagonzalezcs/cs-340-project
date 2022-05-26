import express from 'express';
import { response } from 'express';
import { getAllAuthors, getAuthor, createAuthor, updateAuthor, deleteAuthor, getAuthorBooks } from '../models/authors.mjs';

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

/**
 * Get a single author
 */
authorsRouter.get('/:authorId', async (request, response) => {
  try {
    const authorId = request.params.authorId
    const getAuthor = await getAuthor(authorId);
    response.json(getAuthor);
  } catch (error) {
    response.status(500).json({ error });
  }
});

/**
 * Get all books by a single author
 */
authorsRouter.get('/books/:authorId', async (request, response) => {
  try {
    const authorId = request.params.authorId;
    console.log(authorId)
    const getBooks = await getAuthorBooks(authorId);
    response.json(getBooks);
  } catch (error) {
    response.status(500).json({ error });
  }
});

/**
 * Create an author
 */
authorsRouter.post('/', async (request, response) => {
  try {
    const newAuthorData = request.body;
    console.log(newAuthorData);
    await createAuthor(
      newAuthorData.name, 
      newAuthorData.birth_date
    );
    response.json({ message: 'Author has been successfully added.' })
  } catch (error) {
    response.status(500).json({ error })
  }
}); 

/**
 * Update an author
 */
authorsRouter.put('/:authorId', async (request, response) => {
  try {
    const authorId = request.params.authorId;
    const authorData = request.body;
    await updateAuthor(
      authorId, 
      authorData.name, 
      authorData.birth_date
    );
    response.json({ message: 'Author has been successfully updated.' });
  } catch (error) {
    response.status(500).json({ error });
  }
}); 

authorsRouter.delete('/:authorId', async (request, response) => {
  try {
    const authorId = request.params.authorId;
    await deleteAuthor(authorId);
    response.json({ message: 'Author has been successfully deleted.' });
  } catch (error) {
    response.status(500).json({ error });
  }
});

export default authorsRouter;
