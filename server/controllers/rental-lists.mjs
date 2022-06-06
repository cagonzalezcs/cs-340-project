import * as rentalListsModel from '../models/rental-lists.mjs';
import * as wishListsModel  from '../models/wish-lists.mjs';

const getAllRentalListItemsForUser = async (request, response) => {
  try {
    const userId = request.params.userId;
    const userRentalListItems = await rentalListsModel.getAllRentalListItemsForUser(userId);
    response.json(userRentalListItems);
  } catch (error) {
    response.status(500).json({ error });
  }
};

const createRentalListItem = async (request, response) => {
  try {
    const newRentalListItemData = request.body;
    await rentalListsModel.createRentalListItem(newRentalListItemData.user_id, newRentalListItemData.book_id);
    response.json({ message: 'Rental list item has been successfully created.' });
  } catch (error) {
    response.status(500).json({ error });
  }
};

const rentBookForUser = async (request, response) => {
  try {
    const bookRentalInfo = request.body;
    const userId = bookRentalInfo.user_id;
    const bookId = bookRentalInfo.book_id;

    const existingRentals = await rentalListsModel.getAllRentalListItemsForUser(userId);
    if (existingRentals.length >= 3) {
      response.status(422).json({ message: 'Cannot process rental, user has the max number of available rentals.'});
      return;
    }

    // Might need to think about validation here a bit more.
    // In particular,
    await wishListsModel.deleteWishListItem(userId, bookId);
    await rentalListsModel.createRentalListItem(userId, bookId);
    response.json({ message: 'Book rental has been successfully registered.' });
  } catch (error) {
    response.status(500).json({ error });
  }
};

const deleteRentalListItem = async (request, response) => {
  try {
    const rentalListData = request.body;
    await rentalListsModel.deleteRentalListItem(rentalListData.user_id, rentalListData.book_id);
    response.json({ message: 'Rental list item has been successfully deleted.' });
  } catch (error) {
    response.status(500).json({ error });
  }
};

export {
  getAllRentalListItemsForUser,
  createRentalListItem,
  rentBookForUser,
  deleteRentalListItem,
};
