import Cookies from 'js-cookie';

const setAuthToken = (jwt) => {
  Cookies.set(import.meta.env.VITE_AUTH_COOKIE_NAME, jwt, {
    expires: 24,
    sameSite: 'strict',
    secure: import.meta.env.MODE === 'production',
  });
};

const getAuthToken = () => {
  return Cookies.get(import.meta.env.VITE_AUTH_COOKIE_NAME);
};

const deleteAuthToken = () => {
  Cookies.remove(import.meta.env.VITE_AUTH_COOKIE_NAME);
};

export { setAuthToken, getAuthToken, deleteAuthToken };
