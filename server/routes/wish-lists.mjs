import express from 'express';
import * as wishListsController from '../controllers/wish-lists.mjs';
import { checkAuthToken, checkIsCurrentCustomer, checkAdminAuth } from '../utils/middleware.mjs';

const wishListsRouter = express.Router();

// GET all Wish Lists
wishListsRouter.get('/', checkAuthToken, checkAdminAuth, wishListsController.getAllWishLists);

/**
 * Get a single wish list item
 */
wishListsRouter.get('/single', checkAuthToken, checkIsCurrentCustomer, wishListsController.getSingleWishListItem)

/**
 * Get all wish list items for a user
 */
wishListsRouter.get('/user/:userId', checkAuthToken, checkIsCurrentCustomer, wishListsController.getAllWishListItemsForUser);

/**
 * Add a book to a user's wish list
 */
wishListsRouter.post('/add-book', checkAuthToken, checkIsCurrentCustomer, wishListsController.createWishListItem)

/**
 * Delete rental list item
 */
wishListsRouter.delete('/', checkAuthToken, checkIsCurrentCustomer, wishListsController.deleteWishListItem);

export default wishListsRouter;
