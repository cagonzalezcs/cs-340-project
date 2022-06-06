import express from 'express';
import * as wishListsController from '../controllers/wish-lists.mjs';
import { checkAuthToken, checkIsCurrentCustomer } from '../utils/middleware.mjs';

const wishListsRouter = express.Router();

/**
 * Get a single wish list item
 */
wishListsRouter.get('/single', checkAuthToken, checkIsCurrentCustomer, wishListsController.getSingleWishListItem)

/**
 * Get all wish list items for a user
 */
wishListsRouter.get('/user/:userId', checkAuthToken, checkIsCurrentCustomer, wishListsController.getAllWishListItemsForUser);

/**
 * Delete rental list item
 */
wishListsRouter.delete('/', checkAuthToken, checkIsCurrentCustomer, wishListsController.deleteWishListItem);

export default wishListsRouter;
