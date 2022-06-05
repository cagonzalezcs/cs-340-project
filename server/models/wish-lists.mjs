import { dbQuery } from '../db/db-connection.mjs';

const getAllWishListItemsForUser = async (userId) => {
  if (!userId) {
    throw 'User Id is a required parameter to get user wish list items';
  }

  return await dbQuery(`SELECT wish_list_books.book_id,
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
                        GROUP BY wish_list_books.book_id;`, [userId]);
};

export { getAllWishListItemsForUser };
