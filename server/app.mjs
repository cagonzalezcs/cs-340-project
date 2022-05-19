import dotenv from 'dotenv';
dotenv.config();
import util from 'util';
import express from 'express';
import cors from 'cors';
import booksRouter from './routes/books.mjs';
import genresRouter from './routes/genres.mjs';

const BASE_URL = '/api/'
const app = express();
const router = express.Router();

app.use(BASE_URL, router);
router.use(
  cors({
    origin: process.env.CLIENT_URI,
  })
);
router.use(express.json());

router.use('/books', booksRouter);
router.use('/genres', genresRouter);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Listening to port ${process.env.SERVER_PORT}`);
});
