import dotenv from 'dotenv';

dotenv.config();
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import session from 'express-session';
import MySQLSession from 'express-mysql-session';
import { cookieOptions } from './utils/cookies.mjs';
import authRouter from './routes/auth.mjs';
import usersRouter from './routes/users.mjs';
import userRolesRouter from './routes/user-roles.mjs';
import booksRouter from './routes/books.mjs';
import authorsRouter from './routes/authors.mjs';
import genresRouter from './routes/genres.mjs';

const BASE_URL = '/api/';
const MySQLStore = MySQLSession(session);
const sessionStore = new MySQLStore({
  host: process.env.DB_HOST,
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME,
});
const app = express();
export const router = express.Router();
app.use(morgan('dev'));
app.use(session({
  name: 'novel_pursuits_session',
  key: 'novel_pursuits_session_cookie',
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: cookieOptions,
}));
app.use(BASE_URL, router);
router.use(
  cors({
    origin: process.env.CLIENT_URI,
  }),
);

router.use(express.json());

router.use('/auth', authRouter);

router.use('/users', usersRouter);

router.use('/user-roles', userRolesRouter);

router.use('/books', booksRouter);

router.use('/authors', authorsRouter);

router.use('/genres', genresRouter);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Listening to port ${ process.env.SERVER_PORT }`);
});
