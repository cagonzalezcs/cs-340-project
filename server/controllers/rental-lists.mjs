import * as rentalListModels from '../models/rental-lists.mjs'

const getAllRentalLists = async (request, response) => {
  try {
    const rentalLists = await rentalListModels.getAllRentalLists();
    response.json(rentalLists)
  } catch (error) {
    response.status(500).json({ error });
  }
};

const getRentalList = async (request, response) => {
    try {
      const userId = request.params.userId;
      const rentalListData = await rentalListModels.getUserRentalList(userId);
      response.json(rentalListData)
    } catch (error) {
      response.status(500).json({ error });
    }
  };

  export { getRentalList, getAllRentalLists }