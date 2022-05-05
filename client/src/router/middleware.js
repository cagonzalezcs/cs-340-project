import router from './index';
import { useUserStore } from '../stores/user';

const checkUserAuth = async (newRoute) => {
  const user = useUserStore();
  const authRoutes = ['/', '/register', '/forgot-password'];

  if (!user.isLoggedIn && !authRoutes.includes(newRoute.path)) {
    return await router.push('/');
  }

  if (user.isLoggedIn && authRoutes.includes(newRoute.path)) {
    if (user.isAdmin) {
      return await router.push('/admin/users');
    }

    return await router.push('/rental-list');
  }
};

export default checkUserAuth;
