import { dbQuery } from '../db/db-connection.mjs';

const getAllRentalLists = async () => {
  return await dbQuery(
    `SELECT
      rental_list_books.user_id AS user_id, 
      books.id,
      books.title
    FROM
      books
    INNER JOIN rental_list_books ON books.id = rental_list_books.user_id
    GROUP BY
      rental_list_books.user_id
    ORDER BY
      rental_list_books.user_id;`
  );
};

const getAllRentalListItemsForUser = async (userId) => {
  if (!userId) {
    throw 'User Id is a required parameter to get user rental list items';
  }

  return await dbQuery(`SELECT rental_list_books.book_id,
                               books.title,
                               books.isbn,
                               books.cover_image,
                               (SELECT GROUP_CONCAT(authors.name SEPARATOR ', ')
                                FROM authors
                                         LEFT JOIN book_authors ON authors.id = book_authors.author_id
                                WHERE book_authors.book_id = rental_list_books.book_id) AS 'authors',
                               genres.name                                              AS 'genre',
                               rental_list_books.created_at                             AS 'date_rented'
                        FROM rental_list_books
                                 LEFT JOIN books ON rental_list_books.book_id = books.id
                                 LEFT JOIN book_authors ON rental_list_books.book_id = book_authors.book_id
                                 LEFT JOIN authors ON book_authors.author_id = authors.id
                                 LEFT JOIN genres ON books.genre_id = genres.id
                        WHERE rental_list_books.user_id = ?
                        GROUP BY rental_list_books.book_id
                        ORDER BY date_rented DESC;`, [userId]);
};

const createRentalListItem = async (userId, bookId) => {
  if (!userId || !bookId) {
    throw 'A User Id and Book Id are required to add a rental list item';
  }

  return await dbQuery(`
      INSERT INTO rental_list_books (user_id, book_id)
      VALUES (?, ?);
  `, [userId, bookId]);
};

const deleteRentalListItem = async (userId, bookId) => {
  if (!userId || !bookId) {
    throw 'A User Id and Book Id are required to remove a rental list item';
  }

  return await dbQuery(`
      DELETE
      FROM rental_list_books
      WHERE rental_list_books.user_id = ?
        AND rental_list_books.book_id = ?;
  `, [userId, bookId]);
};

export { getAllRentalLists, getAllRentalListItemsForUser, createRentalListItem, deleteRentalListItem };
