const cookieOptions = {
  path: '/',
  maxAge: 24 * 60 * 60, // in milliseconds, equal to one month
  httpOnly: true,
  signed: true,
  secret: process.env.COOKIE_SECRET,
  sameSite: 'strict',
  secure: process.env.APP_ENV === 'production'
}

export { cookieOptions };
