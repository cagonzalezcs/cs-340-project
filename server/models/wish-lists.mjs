import { dbQuery } from '../db/db-connection.mjs';

const getAllWishLists = async () => {
  return await dbQuery(
    `SELECT
      wish_list_books.user_id AS user_id, 
      books.id,
      books.title
    FROM
      books
    INNER JOIN wish_list_books ON books.id = wish_list_books.user_id
    GROUP BY
      wish_list_books.user_id
    ORDER BY
      wish_list_books.user_id;`
  );
};

const getSingleWishListItem = async (userId, bookId) => {
  if (!userId || !bookId) {
    throw 'User Id and Book Id are required parameters to get a wish list item';
  }

  console.log(bookId);
  return await dbQuery(`SELECT *
                        FROM wish_list_books
                        WHERE user_id = ?
                          AND book_id = ?`, [userId, bookId]);
};

const getAllWishListItemsForUser = async (userId) => {
  if (!userId) {
    throw 'User Id is a required parameter to get user wish list items';
  }

  return await dbQuery(`SELECT wish_list_books.book_id,
                               wish_list_books.created_at,
                               books.title,
                               books.isbn,
                               books.cover_image,
                               (SELECT GROUP_CONCAT(authors.name SEPARATOR ', ')
                                FROM authors
                                         LEFT JOIN book_authors ON authors.id = book_authors.author_id
                                WHERE book_authors.book_id = wish_list_books.book_id) AS 'authors',
                               genres.name                                            AS 'genre'
                        FROM wish_list_books
                                 LEFT JOIN books ON wish_list_books.book_id = books.id
                                 LEFT JOIN book_authors ON wish_list_books.book_id = book_authors.book_id
                                 LEFT JOIN authors ON book_authors.author_id = authors.id
                                 LEFT JOIN genres ON books.genre_id = genres.id
                        WHERE wish_list_books.user_id = ?
                        GROUP BY wish_list_books.book_id
                        ORDER BY wish_list_books.created_at DESC;`, [userId]);
};

const createWishListItem = async (userId, bookId) => {
  if (!userId || !bookId) {
    throw 'A User Id and Book Id are required to add a wish list item';
  }

  return await dbQuery(`
      INSERT INTO wish_list_books (user_id, book_id)
      VALUES (?, ?);
  `, [userId, bookId]);
};

const deleteWishListItem = async (userId, bookId) => {
  if (!userId || !bookId) {
    throw 'A User Id and Book Id are required to remove a wish list item';
  }

  return await dbQuery(`
      DELETE
      FROM wish_list_books
      WHERE wish_list_books.user_id = ?
        AND wish_list_books.book_id = ?;
  `, [userId, bookId]);
};

export { getAllWishLists, getSingleWishListItem, getAllWishListItemsForUser, createWishListItem, deleteWishListItem };
