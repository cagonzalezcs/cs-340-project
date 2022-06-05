import express from 'express';
import * as rentalListsController from '../controllers/rental-lists.mjs';
import { checkAdminAuth, checkAuthToken } from '../utils/middleware.mjs';

const rentalListsRouter = express.Router();

// GET all Rental Lists
rentalListsRouter.get('/', checkAuthToken, checkAdminAuth, rentalListsController.getAllRentalLists);

// GET Rental List for User by ID
rentalListsRouter.get('/:userId', checkAuthToken, checkAdminAuth, rentalListsController.getUserRentalList);

export default rentalListsRouter;
