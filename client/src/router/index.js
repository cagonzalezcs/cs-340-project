import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../pages/auth/LoginPage.vue';
import RegisterPage from '../pages/auth/RegisterPage.vue';
import CustomerMyBooks from '../pages/customer/CustomerMyBooks.vue';
import CustomerSearchBooksPage from '../pages/customer/CustomerSearchBooksPage.vue';
import UsersPage from '../pages/admin/UsersPage.vue';
import RolesPage from '../pages/admin/RolesPage.vue';
import BooksPage from '../pages/admin/BooksPage.vue';
import AuthorsPage from '../pages/admin/AuthorsPage.vue';
import GenresPage from '../pages/admin/GenresPage.vue';
import WishListsPage from '../pages/admin/WishListsPage.vue';
import RentalListsPage from '../pages/admin/RentalListsPage.vue';
import SearchBooksPage from '../pages/admin/SearchBooksPage.vue';
import NotFoundPage from '../pages/NotFoundPage.vue';

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
    path: '/my-books',
    name: 'My Books',
    component: CustomerMyBooks,
  },
  {
    path: '/search-books',
    name: 'Search Books',
    component: CustomerSearchBooksPage,
  },
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
  {
    path: '/:pathMatch(.*)*',
    name: 'Not Found',
    component: NotFoundPage,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
