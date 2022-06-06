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

const getUserWishList = async (userId) => {
    if (!userId) {
      throw 'User id is required to retrieve a wish list.'
    }
    return await dbQuery(
      `SELECT
        wish_list_books.user_id AS user_id,
        books.id, 
        books.title
      FROM
        books
      INNER JOIN wish_list_books ON books.id = wish_list_books.book_id
      WHERE
        wish_list_books.user_id = ?`, [userId]
    );
  };

const deleteWishListItem = async (userId, itemId) => {
  if(!itemId || !userId) {
    throw 'Item id and User id are required to delete an item from a wish list.'
  }
  return await dbQuery(`
    DELETE
    FROM
        wish_list_books
    WHERE
        wish_list_books.user_id = ? AND wish_list_books.book_id = ?`, 
    [userId, itemId]);
};

  export { getAllWishLists, getUserWishList, deleteWishListItem }