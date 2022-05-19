import dotenv from 'dotenv';

dotenv.config();
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import booksRouter from './routes/books.mjs';
import authorsRouter from './routes/authors.mjs';
import genresRouter from './routes/genres.mjs';

const BASE_URL = '/api/';
const app = express();
export const router = express.Router();
app.use(morgan('dev')); // added this to try and ensure the backend was being queried
app.use(BASE_URL, router);
router.use(
  cors({
    origin: process.env.CLIENT_URI,
  }),
);

router.use(express.json());

router.use('/books', booksRouter);

router.use('/authors', authorsRouter);

router.use('/genres', genresRouter);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Listening to port ${ process.env.SERVER_PORT }`);
});
