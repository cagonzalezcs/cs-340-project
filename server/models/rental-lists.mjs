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

const getUserRentalList = async (userId) => {
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

const deleteRentalListItem = async (userId, itemId) => {
  if(!itemId || !userId) {
    throw 'Item id and User id are required to delete an item from a rental list.'
  }
  return await dbQuery(`
    DELETE
    FROM
        rental_list_books
    WHERE
        rental_list_books.user_id = ? AND rental_list_books.book_id = ?`, 
    [userId, itemId]);
};

  export { getAllRentalLists, getUserRentalList, deleteRentalListItem }