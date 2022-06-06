import * as rentalListsModel from '../models/rental-lists.mjs';
import * as wishListsModel from '../models/wish-lists.mjs';
import * as booksModel from '../models/books.mjs';

const getAllRentalLists = async (request, response) => {
  try {
    const rentalLists = await rentalListsModel.getAllRentalLists();
    response.json(rentalLists);
  } catch (error) {
    response.status(500).json({ error });
  }
};

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
    const alreadyRentedBook = existingRentals.filter((rental) => rental.user_id === userId && rental.book_id === bookId);
    if (alreadyRentedBook.length || existingRentals.length >= 3) {
      response.status(422).json({ message: 'Cannot process rental, user has the max number of available rentals.' });
      return;
    }

    let bookToRent = await booksModel.getBook(bookId);
    bookToRent = bookToRent[0];
    if (bookToRent.quantity_available === bookToRent.quantity_rented) {
      response.status(422).json({ message: 'Cannot rent book, no copies are available to rent out.' });
      return;
    }

    await booksModel.updateBookQuantityAvailable(
      bookToRent.id,
      (bookToRent.quantity_rented + 1),
    );
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

    let bookToRent = await booksModel.getBook(rentalListData.book_id);
    bookToRent = bookToRent[0];
    await booksModel.updateBookQuantityAvailable(
      bookToRent.id,
      (bookToRent.quantity_rented - 1),
    );

    response.json({ message: 'Rental list item has been successfully deleted.' });
  } catch (error) {
    response.status(500).json({ error });
  }
};

export {
  getAllRentalLists,
  getAllRentalListItemsForUser,
  createRentalListItem,
  rentBookForUser,
  deleteRentalListItem,
};
