import express from 'express';
import * as rentalListsController from '../controllers/rental-lists.mjs';
import { checkAuthToken, checkIsCurrentCustomer } from '../utils/middleware.mjs';

const rentalListsRouter = express.Router();

/**
 * Get all rental list items for a user
 */
rentalListsRouter.get('/user/:userId', checkAuthToken, checkIsCurrentCustomer, rentalListsController.getAllRentalListItemsForUser);

export default rentalListsRouter;
