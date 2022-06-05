import * as rentalListsModel from '../models/rental-lists.mjs';

const getAllRentalListItemsForUser = async (request, response) => {
  try {
    const userId = request.params.userId;
    const userRentalListItems = await rentalListsModel.getAllRentalListItemsForUser(userId);
    response.json(userRentalListItems);
  } catch (error) {
    response.status(500).json({ error });
  }
};

export {
  getAllRentalListItemsForUser,
};
