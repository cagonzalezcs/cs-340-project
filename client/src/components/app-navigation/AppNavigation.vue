<script setup>
import { useUserStore } from '../../stores/user';
import router from '../../router';
import AppNavigationAdmin from './AppNavigationAdmin.vue';
import AppNavigationCustomer from './AppNavigationCustomer.vue';

const user = useUserStore();

async function logUserOut() {
  user.logout();

  await router.push('/');
}
</script>

<template>
  <div class='app-navigation'>
    <div class='app-navigation__logo'>
      Novel Pursuits Admin Dashboard
    </div>

    <app-navigation-admin v-if='user.isAdmin' class='app-navigation__items' />
    <app-navigation-customer v-else class='app-navigation__items' />

    <button class='app-navigation__button' @click='logUserOut'>Logout</button>
  </div>
</template>

<style lang='scss'>
.app-navigation {
  display: flex;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  background-color: #f1f1f1;
  padding: 12px 20px;
  margin-bottom: 80px;

  &__logo {
    font-size: 1.2rem;
    font-weight: bold;
  }

  &__items {
    margin-left: auto;
    margin-right: 30px;

    & > a {
      margin-left: 20px;
    }
  }

  &__button {
    width: 150px;
  }
}
</style>
