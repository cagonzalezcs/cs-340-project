import * as wishListModels from '../models/wish-lists.mjs'

const getAllWishLists = async (request, response) => {
  try {
    const wishLists = await wishListModels.getAllWishLists();
    response.json(wishLists)
  } catch (error) {
    response.status(500).json({ error });
  }
};

const getWishList = async (request, response) => {
    try {
      const userId = request.params.userId;
      const wishListData = await wishListModels.getUserWishList(userId);
      response.json(wishListData)
    } catch (error) {
      response.status(500).json({ error });
    }
  };

  const deleteWishListItem = async (request, response) => {
    try {
      const itemId = request.params.itemId;
      const userId = request.params.userId
      console.log('item and user id', itemId, userId)
      await wishListModels.deleteWishListItem(userId, itemId);
      response.json({ message: 'Item has been successfully deleted.' });
    } catch (error) {
      response.status(500).json({ error });
    }
  };

  export { getWishList, getAllWishLists, deleteWishListItem }