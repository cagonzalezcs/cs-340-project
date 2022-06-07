import { defineStore } from 'pinia';

export const useAdminStore = defineStore({
  id: 'admin-store',
  state: () => ({
    users: [],
    books: [],
    authors: [],
    genres: [],
    rentalLists: [],
    wishLists: [],
    userRoles: [],
  }),
});
