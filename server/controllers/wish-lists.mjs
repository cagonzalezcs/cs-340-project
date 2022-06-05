import * as wishListsModel from '../models/wish-lists.mjs';

const getAllWishListItemsForUser = async (request, response) => {
  try {
    const userId = request.params.userId;
    const userWishListItems = await wishListsModel.getAllWishListItemsForUser(userId);
    response.json(userWishListItems);
  } catch (error) {
    response.status(500).json({ error });
  }
};

export { getAllWishListItemsForUser };
