import util from 'util';
import { dbPool } from '../db/db-connection.mjs';

const dbQuery = util.promisify(dbPool.query).bind(dbPool);

const getAllBooks = async () => {
  return await dbQuery('SELECT * FROM books');
};

const getBook = async (bookId) => {
  if (!bookId) {
    throw 'Book Id is a required parameter to get a book';
  }

  return await dbQuery('SELECT * FROM books WHERE books.id = ?', [bookId]);
};

const updateBook = async (bookId, title, genreId, isbn, coverImage, quantityAvailable, quantityRented) => {
  if (!bookId) {
    throw 'Book Id is a required parameter to update a book.';
  }

  let bookRecord = await getBook(bookId);
  bookRecord = bookRecord[0];
  if (!bookRecord) {
    throw 'Book not found, unable to update book';
  }

  const updatedTitle = title || bookRecord.title;
  const updatedGenreId = genreId || bookRecord.genre_id;
  const updatedIsbn = isbn || bookRecord.isbn;
  const updatedCoverImage = coverImage || bookRecord.cover_image;
  const updatedQuantityAvailable = quantityAvailable || bookRecord.quantity_available;
  const updateQuantityRented = quantityRented || bookRecord.quantity_rented;

  return await dbQuery(`
    UPDATE books 
    SET books.title = ?, books.genre_id = ?, books.isbn = ?, books.cover_image = ?, books.quantity_available = ?, books.quantity_rented = ? 
    WHERE books.id = ?`,
    [
      updatedTitle,
      updatedGenreId,
      updatedIsbn,
      updatedCoverImage,
      updatedQuantityAvailable,
      updateQuantityRented,
      bookId
    ]
  );
};

const deleteBook = async (bookId) => {
  if (!bookId) {
    throw 'Book Id is a required parameter to delete a book.';
  }

  return await dbQuery('DELETE FROM books WHERE books.id = ?', [bookId]);
};

export { getAllBooks, getBook, updateBook, deleteBook };
