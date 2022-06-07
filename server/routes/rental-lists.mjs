import express from 'express';
import * as rentalListsController from '../controllers/rental-lists.mjs';
import { checkAuthToken, checkIsCurrentCustomer, checkAdminAuth } from '../utils/middleware.mjs';

const rentalListsRouter = express.Router();

// GET all Rental Lists
rentalListsRouter.get('/', checkAuthToken, checkAdminAuth, rentalListsController.getAllRentalLists);

/**
 * Get all rental list items for a user
 */
rentalListsRouter.get('/user/:userId', checkAuthToken, checkIsCurrentCustomer, rentalListsController.getAllRentalListItemsForUser);

/**
 * Post rental from user wish list to rental list
 */

rentalListsRouter.post('/rent-book', checkAuthToken, checkIsCurrentCustomer, rentalListsController.rentBookForUser);

/**
 * Add a book to a user's wish list
 */
rentalListsRouter.post('/add-book', checkAuthToken, checkIsCurrentCustomer, rentalListsController.createRentalListItem)

/**
 * Delete rental list item
 */
rentalListsRouter.delete('/', checkAuthToken, checkIsCurrentCustomer, rentalListsController.deleteRentalListItem);

export default rentalListsRouter;
