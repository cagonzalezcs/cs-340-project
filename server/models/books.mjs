import util from 'util';
import { dbPool } from '../db/db-connection.mjs';

const dbQuery = util.promisify(dbPool.query).bind(dbPool);

// Get all books
const getAllBooks = async () => {
    return await dbQuery(
        `SELECT 
            books.id, 
            books.title,  
            authors.name as "author",
            genres.name AS "genre", 
            books.isbn, 
            books.cover_image, 
            books.quantity_available, 
            books.quantity_rented 
        FROM 
            books 
        INNER JOIN 
            genres ON books.genre_id = genres.id
        INNER JOIN 
            book_authors ON books.id = book_authors.book_id
        INNER JOIN
            authors ON book_authors.author_id = authors.id`);
};

// Get a single book, used for update and for second part of create 
const getBook = async (bookId) => {
    if (!bookId) {
      throw 'Book Id is a required parameter to get a book';
    } 
    return await dbQuery('SELECT * FROM books WHERE books.id = ?', [bookId]);
  };


// Create a new book
const createBook = async (title, author, genreId, isbn, coverImage, quantityAvailable, quantityRented) => {
    console.log('meowuptop create book')
    const newBook = await dbQuery(
        `INSERT INTO books(
            title,
            genre_id,
            isbn,
            cover_image,
            quantity_available,
            quantity_rented
        )
        VALUES (
            ?,
            ?,
            ?,
            ?,
            ?,
            ?
        )`, [title, genreId, isbn, coverImage, quantityAvailable, quantityRented]
    ).then( async (data) => {
        if (data) {
            const bookId =
                Object.values(JSON.parse(JSON.stringify(data)))[2];
            const authorData = await dbQuery(
                'SELECT id FROM authors WHERE name= ?', [author]
            );
            const authorId = authorData[0].id;
            // console.log(authorID);
            return await dbQuery(
                `INSERT INTO book_authors(
                    book_id, 
                    author_id
                )
                VALUES(
                    ?,
                    ?
                )`, [bookId, authorId]
            );
        }
    })
};

export { getAllBooks, createBook, getBook }