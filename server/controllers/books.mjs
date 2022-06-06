import * as booksModel from '../models/books.mjs';
import * as genresController from './genres.mjs';
import * as authorsController from './authors.mjs';

const getAllBooks = async (request, response) => {
  try {
    const allBooks = await booksModel.getAllBooks();
    response.json(allBooks);
  } catch (error) {
    response.status(500).json({ error });
  }
};

const getBook = async (request, response) => {
  try {
    const bookId = request.params.bookId;
    const book = await booksModel.getBook(bookId);
    response.json(book);
  } catch (error) {
    response.status(500).json({ error });
  }
};

const createBook = async (request, response) => {
  try {
    const newBookData = request.body;
    const authors = newBookData.authors;
    let authorId = null;
    let genreId = parseInt(newBookData.genre_id);
    if (isNaN(genreId)) {
      const lookupId = newBookData.genre_id;
      genreId = await genresController.getGenreByName(lookupId);
    }
    if (typeof (authors) === 'string') {
      const lookupAuthor = authors;
      authorId = await authorsController.getAuthorByName(lookupAuthor);
    }
    await booksModel.createBook(
      newBookData.title,
      newBookData.authors,
      genreId,
      newBookData.isbn,
      newBookData.cover_image,
      newBookData.quantity_available,
      newBookData.quantity_rented,
      authorId,
    );
    response.json({ message: 'Book has been successfully created.' });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

const updateBook = async (request, response) => {
  try {
    const bookId = request.params.bookId;
    const bookData = request.body;
    let genreId = bookData.genre_id;

    console.log(bookData);

    // GenreID might be passed in as a name for some reason... will fix later
    if (typeof genreId === 'string') {
      genreId = await genresController.getGenreByName(genreId);
    }

    // Update Book
    await booksModel.updateBook(
      bookId,
      bookData.title,
      genreId,
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
};

const deleteBook = async (request, response) => {
  try {
    const bookId = request.params.bookId;
    await booksModel.deleteBook(bookId);
    response.json({ message: 'Book has been successfully deleted.' });
  } catch (error) {
    response.status(500).json({ error });
  }
};

const searchBooksByTitle = async (request, response) => {
  try {
    const bookTitle = request.params.bookTitle;
    const foundBooks = await booksModel.searchBooksByTitle(bookTitle);
    response.json(foundBooks);
  } catch (error) {
    response.status(500).json({ error });
  }
};

const searchBooksByGenre = async (request, response) => {
  try {
    const genreId = request.params.genreId;
    const foundBooks = await booksModel.searchBooksByGenre(genreId);
    response.json(foundBooks);
  } catch (error) {
    response.status(500).json({ error });
  }
};

const searchBooksByAuthor = async (request, response) => {
  try {
    const authorId = request.params.authorId;
    const foundBooks = await booksModel.searchBooksByAuthor(authorId);
    response.json(foundBooks);
  } catch (error) {
    response.status(500).json({ error });
  }
};

const searchBooksByKeyword = async (request, response) => {
  try {
    const keyword = request.params.keyword;
    const foundBooks = await booksModel.searchBooksByKeyword(keyword);
    response.json(foundBooks);
  } catch (error) {
    response.status(500).json({ error });
  }
};

export {
  getAllBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
  searchBooksByTitle,
  searchBooksByGenre,
  searchBooksByAuthor,
  searchBooksByKeyword,
};
