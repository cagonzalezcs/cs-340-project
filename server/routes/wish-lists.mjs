import express from 'express';
import * as wishListsController from '../controllers/wish-lists.mjs';
import { checkAdminAuth, checkAuthToken } from '../utils/middleware.mjs';

const wishListsRouter = express.Router();

// GET all Wish Lists
wishListsRouter.get('/', checkAuthToken, checkAdminAuth, wishListsController.getAllWishLists);

// GET Wish List for User by ID
wishListsRouter.get('/:userId', checkAuthToken, checkAdminAuth, wishListsController.getWishList);

// DELETE Wish List item by User and Item ID
wishListsRouter.delete('/:userId/:itemId', checkAuthToken, checkAdminAuth, wishListsController.deleteWishListItem);

export default wishListsRouter;
