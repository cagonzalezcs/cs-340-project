import router from './index';
import { useUserStore } from '../stores/user';

const checkUserIsLoggedIn = async (isLoggedIn) => {
  if (isLoggedIn) {
    return;
  }

  await router.push('/');
};

const checkUserIsCustomer = async () => {
  const user = useUserStore();
  checkUserIsLoggedIn(user.isLoggedIn);

  if (!user.isAdmin) {
    return;
  }

  await router.push('/admin/users');
};

const checkUserIsAdmin = async () => {
  const user = useUserStore();
  checkUserIsLoggedIn(user.isLoggedIn);

  if (user.isAdmin) {
    return;
  }

  await router.push('/my-books');
};

const checkUserIsLoggedOut = async () => {
  const user = useUserStore();

  if (!user.isLoggedIn) {
    return;
  }

  if (user.isAdmin) {
    return await router.push('/admin/users');
  }

  await router.push('/my-books');
};

export { checkUserIsCustomer, checkUserIsAdmin, checkUserIsLoggedOut };
