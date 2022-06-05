import express from 'express';
import * as wishListsController from '../controllers/wish-lists.mjs';
import { checkAuthToken, checkIsCurrentCustomer } from '../utils/middleware.mjs';

const wishListsRouter = express.Router();

/**
 * Get all wish list items for a user
 */
wishListsRouter.get('/user/:userId', checkAuthToken, checkIsCurrentCustomer, wishListsController.getAllWishListItemsForUser);

export default wishListsRouter;
