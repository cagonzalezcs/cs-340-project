import * as wishListsModel from '../models/wish-lists.mjs';
import * as rentalListsModel from '../models/rental-lists.mjs';

const getAllWishLists = async (request, response) => {
  try {
    const wishLists = await wishListsModel.getAllWishLists();
    response.json(wishLists)
  } catch (error) {
    response.status(500).json({ error });
  }
};

const getSingleWishListItem = async (request, response) => {
  try {
    const wishListData = request.body;
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
    const userId = newWishListItemData.user_id;
    const bookId = newWishListItemData.book_id;

    const wishListItem = await wishListsModel.getSingleWishListItem(userId, bookId);
    if (wishListItem.length) {
      response.status(422).json({ message: 'Unable to add book to wish list as it is already present in the list.'});
      return;
    }

    const rentalListItem = await rentalListsModel.getSingleRentalListItem(userId, bookId);
    if (rentalListItem.length) {
      response.status(422).json({ message: 'Unable to add book to wish list as you currently have it rented.'});
      return;
    }

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

export { getAllWishLists, getSingleWishListItem, getAllWishListItemsForUser, createWishListItem, deleteWishListItem };
