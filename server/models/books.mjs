import { dbQuery } from '../db/db-connection.mjs';

// Get all books
const getAllBooks = async () => {
  return await dbQuery(
    `SELECT books.id,
            books.title,
            (SELECT GROUP_CONCAT(authors.name SEPARATOR ', ')
             FROM authors
                      LEFT JOIN book_authors ON authors.id = book_authors.author_id
             WHERE book_authors.book_id = books.id) AS "authors",
            genres.name                             AS "genre",
            books.isbn,
            books.cover_image,
            books.quantity_available,
            books.quantity_rented
     FROM books
              LEFT JOIN genres ON books.genre_id = genres.id
              LEFT JOIN book_authors ON books.id = book_authors.book_id
              LEFT JOIN authors ON book_authors.author_id = authors.id
     GROUP BY books.id
     ORDER BY books.id`);
};

// Get a single book, used for update and for second part of create 
const getBook = async (bookId) => {
  if (!bookId) {
    throw 'Book Id is a required parameter to get a book';
  }
  return await dbQuery('SELECT * FROM books WHERE books.id = ? LIMIT 1', [bookId]);
};


const createBook = async (title, authors, genreId, isbn, coverImage, quantityAvailable, quantityRented, authorId) => {
  const newBook = await dbQuery(
    `INSERT INTO books(title, genre_id, isbn, cover_image, quantity_available, quantity_rented)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [title, genreId, isbn, coverImage, quantityAvailable, quantityRented],
  );
  const bookId = newBook.insertId;
  if (!authorId) {
    for (const authorName of authors) {
      const authorData = await dbQuery(
        'SELECT id FROM authors WHERE name = ?', [authorName],
      );
      authorId = authorData[0].id;
    }
  }
  await dbQuery(
    `INSERT INTO book_authors(book_id, author_id)
     VALUES (?, ?)`,
    [bookId, authorId]);
};

const updateBook = async (bookId, title, genreId, isbn, coverImage, quantityAvailable, quantityRented, authors) => {
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

  await dbQuery(`
              UPDATE books
              SET books.title              = ?,
                  books.genre_id           = ?,
                  books.isbn               = ?,
                  books.cover_image        = ?,
                  books.quantity_available = ?,
                  books.quantity_rented    = ?
              WHERE books.id = ?`,
    [
      updatedTitle,
      updatedGenreId,
      updatedIsbn,
      updatedCoverImage,
      updatedQuantityAvailable,
      updateQuantityRented,
      bookId,
    ],
  );

  await dbQuery(`
      DELETE
      FROM book_authors
      WHERE book_id = ?`, [bookId]);

  for (const authorName of authors) {
    const authorData = await dbQuery(
      `SELECT id
       FROM authors
       WHERE name = ?`, [authorName, bookId],
    );
    const authorId = authorData[0].id;

    await dbQuery(
      `INSERT INTO book_authors(book_id, author_id)
       VALUES (?, ?)`,
      [bookId, authorId],
    );
  }
};

const updateBookQuantityAvailable = async (bookId, quantityAvailable) => {
  if (!bookId || !quantityAvailable) {
    throw 'Book Id and quantity are required to update book quantity';
  }

  await dbQuery(`
              UPDATE books
              SET books.quantity_available = ?
              WHERE books.id = ?`,
    [
      quantityAvailable,
      bookId,
    ],
  );
};

const deleteBook = async (bookId) => {
  if (!bookId) {
    throw 'Book Id is a required parameter to delete a book.';
  }

  return await dbQuery('DELETE FROM books WHERE books.id = ?', [bookId]);
};

const searchBooksByTitle = async (bookTitle) => {
  if (!bookTitle) {
    throw 'Book title is a required parameter to search a book by title.';
  }

  return await dbQuery(
    `SELECT books.id,
            books.title,
            (SELECT GROUP_CONCAT(authors.name SEPARATOR ', ')
             FROM authors
                      LEFT JOIN book_authors ON authors.id = book_authors.author_id
             WHERE book_authors.book_id = books.id) AS "authors",
            genres.name                             AS "genre",
            books.isbn,
            books.cover_image,
            books.quantity_available,
            books.quantity_rented
     FROM books
              LEFT JOIN genres ON books.genre_id = genres.id
              LEFT JOIN book_authors ON books.id = book_authors.book_id
              LEFT JOIN authors ON book_authors.author_id = authors.id
     WHERE books.title LIKE ?
     GROUP BY books.id
     ORDER BY books.id
    `,
    [`%${ bookTitle }%`],
  );
};

const searchBooksByGenre = async (genreId) => {
  if (!genreId) {
    throw 'Genre Id is a required parameter to search a book by genre.';
  }

  return await dbQuery(
    `SELECT books.id,
            books.title,
            (SELECT GROUP_CONCAT(authors.name SEPARATOR ', ')
             FROM authors
                      LEFT JOIN book_authors ON authors.id = book_authors.author_id
             WHERE book_authors.book_id = books.id) AS "authors",
            genres.name                             AS "genre",
            books.isbn,
            books.cover_image,
            books.quantity_available,
            books.quantity_rented
     FROM books
              LEFT JOIN genres ON books.genre_id = genres.id
              LEFT JOIN book_authors ON books.id = book_authors.book_id
              LEFT JOIN authors ON book_authors.author_id = authors.id
     WHERE books.genre_id = ?
     GROUP BY books.id
     ORDER BY books.id
    `,
    [genreId],
  );
};

const searchBooksByAuthor = async (authorId) => {
  if (!authorId) {
    throw 'Author Id is a required parameter to search a book by author.';
  }

  return await dbQuery(
    `SELECT books.id,
            books.title,
            (SELECT GROUP_CONCAT(authors.name SEPARATOR ', ')
             FROM authors
                      LEFT JOIN book_authors ON authors.id = book_authors.author_id
             WHERE book_authors.book_id = books.id) AS "authors",
            genres.name                             AS "genre",
            books.isbn,
            books.cover_image,
            books.quantity_available,
            books.quantity_rented
     FROM books
              LEFT JOIN genres ON books.genre_id = genres.id
              LEFT JOIN book_authors ON books.id = book_authors.book_id
              LEFT JOIN authors ON book_authors.author_id = authors.id
     WHERE book_authors.author_id = ?
     GROUP BY books.id
     ORDER BY books.id
    `,
    [authorId],
  );
};

const searchBooksByKeyword = async (keyword) => {
  if (!keyword) {
    throw 'Keyword a required parameter to search a book.';
  }

  const keywordWildcard = `%${ keyword }%`;
  return await dbQuery(`
      SELECT books.id,
             books.title,
             (SELECT GROUP_CONCAT(authors.name SEPARATOR ', ')
              FROM authors
                       LEFT JOIN book_authors ON authors.id = book_authors.author_id
              WHERE book_authors.book_id = books.id) AS "authors",
             genres.name                             AS "genre",
             books.isbn,
             books.cover_image,
             books.quantity_available,
             books.quantity_rented
      FROM books
               LEFT JOIN genres ON books.genre_id = genres.id
               LEFT JOIN book_authors ON books.id = book_authors.book_id
               LEFT JOIN authors ON book_authors.author_id = authors.id
      WHERE books.title LIKE ?
         OR books.isbn LIKE ?
         OR genres.name LIKE ?
         OR authors.name LIKE ?
      GROUP BY books.id
  `, [keywordWildcard, keywordWildcard, keywordWildcard, keywordWildcard]);
};

export {
  getAllBooks,
  createBook,
  getBook,
  updateBook,
  deleteBook,
  searchBooksByTitle,
  searchBooksByGenre,
  searchBooksByAuthor,
  searchBooksByKeyword,
  updateBookQuantityAvailable
};
