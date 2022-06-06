import { defineStore } from 'pinia';
import { setAuthToken, deleteAuthToken } from '../utils/cookies';
import { isAdminUser } from '../../../global-utils/auth.mjs';

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    id: '',
    roleId: '',
    firstName: '',
    lastName: '',
    email: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    wishList: [],
    rentalList: [],
    isLoggedIn: false,
    isAdmin: false,
  }),
  actions: {
    async logout() {
      try {
        deleteAuthToken();
        this.$patch({
          id: '',
          roleId: '',
          firstName: '',
          lastName: '',
          email: '',
          addressLine1: '',
          addressLine2: '',
          city: '',
          wishList: [],
          rentalList: [],
          isLoggedIn: false,
          isAdmin: false,
        });

        await fetch(`${import.meta.env.VITE_SERVER_URI}auth/logout`, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
        });
      } catch (error) {
        console.error(error);
      }
    },

    async login(userLoginData) {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URI}auth/login`, {
          method: 'POST',
          body: JSON.stringify(userLoginData),
          headers: {
            'Content-type': 'application/json',
          },
        });

        if (response.status !== 200) {
          return false;
        }

        const responseData = await response.json();
        const userData = responseData.user_data;
        const jwt = responseData.jwt;

        setAuthToken(jwt);
        this.setUserData(userData);

        return true;
      } catch (error) {
        console.error(error);
      }
    },

    setUserData(userData) {
      this.$patch({
        id: userData.id,
        roleId: userData.user_role_id,
        firstName: userData.first_name,
        lastName: userData.last_name,
        email: userData.email,
        addressLine1: userData.address_line_1,
        addressLine2: userData.address_line_2,
        city: userData.city,
        isAdmin: isAdminUser(userData.user_role_id),
        isLoggedIn: true,
      });
    },
  },
});
