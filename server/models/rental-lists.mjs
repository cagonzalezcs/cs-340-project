import { dbQuery } from '../db/db-connection.mjs';

const getAllRentalLists = async () => {
  return await dbQuery(
    `SELECT
      rental_list_books.user_id AS user_id, 
      books.id,
      books.title
    FROM
      books
    INNER JOIN rental_list_books ON books.id = rental_list_books.id`
  );
};  

const getRentalList = async (userId) => {
    if (!userId) {
      throw 'User id is required to retrieve a rental list.'
    }
    return await dbQuery(
      `SELECT
        rental_list_books.user_id AS user_id,
        books.id, 
        books.title
      FROM
        books
      INNER JOIN rental_list_books ON books.id = rental_list_books.book_id
      WHERE
        rental_list_books.user_id = ?`, [userId]
    );
  };

  export { getAllRentalLists, getRentalList }