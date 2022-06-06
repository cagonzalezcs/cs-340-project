import * as wishListsModel from '../models/wish-lists.mjs';

const getSingleWishListItem = async (request, response) => {
  try {
    const wishListData = request.body;
    console.log(wishListData);
    const userId = wishListData.user_id;
    const bookId = wishListData.book_id;
    const wishListItem = await wishListsModel.getSingleWishListItem(userId, bookId);
    response.json(wishListItem[0]);
  } catch (error) {
    response.status(500).json({ error });
  }
}

const getAllWishListItemsForUser = async (request, response) => {
  try {
    const userId = request.params.userId;
    const userWishListItems = await wishListsModel.getAllWishListItemsForUser(userId);
    response.json(userWishListItems);
  } catch (error) {
    response.status(500).json({ error });
  }
};

const createWishListItem = async (request, response) => {
  try {
    const newWishListItemData = request.body;
    await wishListsModel.createWishListItem(newWishListItemData.user_id, newWishListItemData.book_id);
    response.json({ message: 'Wish list item has been successfully created.' });
  } catch (error) {
    response.status(500).json({ error });
  }
};

const deleteWishListItem = async (request, response) => {
  try {
    const wishListData = request.body;
    await wishListsModel.deleteWishListItem(wishListData.user_id, wishListData.book_id);
    response.json({ message: 'Wish list item has been successfully deleted.' });
  } catch (error) {
    response.status(500).json({ error });
  }
};

export { getSingleWishListItem, getAllWishListItemsForUser, createWishListItem, deleteWishListItem };
