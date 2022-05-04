import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../pages/LoginPage.vue';
import RegisterPage from '../pages/RegisterPage.vue';
import UsersPage from '../pages/UsersPage.vue';
import RolesPage from '../pages/RolesPage.vue';
import BooksPage from '../pages/BooksPage.vue';
import AuthorsPage from '../pages/AuthorsPage.vue';
import GenresPage from '../pages/GenresPage.vue';

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
    path: '/users', 
    name: 'Users', 
    component: UsersPage,
  }, 
  {
    path: '/roles', 
    name: 'Roles', 
    component: RolesPage,
  }, 
  {
    path: '/books', 
    name: 'Books', 
    component: BooksPage,
  }, 
  {
    path: '/authors', 
    name: 'Authors', 
    component: AuthorsPage,
  }, 
  {
    path: '/genres', 
    name: 'Genres', 
    component: GenresPage,
  }
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
