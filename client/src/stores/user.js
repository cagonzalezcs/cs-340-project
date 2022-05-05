import { defineStore } from 'pinia';

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    name: '',
    isLoggedIn: false,
    isAdmin: false,
  }),
  actions: {
    logout() {
      this.$patch({
        name: '',
        isLoggedIn: false,
        isAdmin: false,
      });
    },

    login(user) {
      this.$patch({
        name: user,
        isAdmin: user.toLowerCase() === 'admin@admin.com',
        isLoggedIn: true,
      });
    },
  },
});
