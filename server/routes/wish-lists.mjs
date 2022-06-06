import express from 'express';
import * as wishListsController from '../controllers/wish-lists.mjs';
import { checkAuthToken, checkIsCurrentCustomer, checkAdminAuth } from '../utils/middleware.mjs';

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


// // GET all Wish Lists
// wishListsRouter.get('/', checkAuthToken, checkAdminAuth, wishListsController.getAllWishLists);
//
// // GET Wish List for User by ID
// wishListsRouter.get('/:userId', checkAuthToken, checkAdminAuth, wishListsController.getWishList);
//
// // DELETE Wish List item by User and Item ID
// wishListsRouter.delete('/:userId/:itemId', checkAuthToken, checkAdminAuth, wishListsController.deleteWishListItem);

export default wishListsRouter;
