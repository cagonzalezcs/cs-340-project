import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../pages/auth/LoginPage.vue';
import RegisterPage from '../pages/auth/RegisterPage.vue';
import ForgotPassword from '../pages/auth/ForgotPasswordPage.vue';
import CustomerRentalListPage from '../pages/customer/CustomerRentalListPage.vue';
import CustomerWishListPage from '../pages/customer/CustomerWishListPage.vue';
import CustomerSearchBooksPage from '../pages/customer/CustomerSearchBooksPage.vue';
import UsersPage from '../pages/admin/UsersPage.vue';
import RolesPage from '../pages/admin/RolesPage.vue';
import BooksPage from '../pages/admin/BooksPage.vue';
import AuthorsPage from '../pages/admin/AuthorsPage.vue';
import GenresPage from '../pages/admin/GenresPage.vue';
import WishListsPage from '../pages/admin/WishListsPage.vue';
import RentalListsPage from '../pages/admin/RentalListsPage.vue';
import SearchBooksPage from '../pages/admin/SearchBooksPage.vue';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginPage,
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage,
  },
  {
    path: '/forgot-password',
    name: 'Forgot Password',
    component: ForgotPassword,
  },
  {
    path: '/rental-list',
    name: 'Customer Rental List',
    component: CustomerRentalListPage,
  },
  {
    path: '/wish-list',
    name: 'Customer Wish List',
    component: CustomerWishListPage,
  },
  {
    path: '/search-books',
    name: 'Search Books',
    component: CustomerSearchBooksPage,
  },
  // Search Books
  // View Wish List
  // View Rental List
  {
    path: '/admin/users',
    name: 'Users',
    component: UsersPage,
  },
  {
    path: '/admin/roles',
    name: 'Roles',
    component: RolesPage,
  },
  {
    path: '/admin/books',
    name: 'Books',
    component: BooksPage,
  },
  {
    path: '/admin/authors',
    name: 'Authors',
    component: AuthorsPage,
  },
  {
    path: '/admin/genres',
    name: 'Genres',
    component: GenresPage,
  },
  {
    path: '/admin/wish-lists',
    name: 'Wish_Lists',
    component: WishListsPage,
  },
  {
    path: '/admin/rental-lists',
    name: 'Rental_Lists',
    component: RentalListsPage,
  },
  {
    path: '/admin/search-books',
    name: 'Search_Books',
    component: SearchBooksPage,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
