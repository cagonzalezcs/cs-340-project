<script setup>
import { useUserStore } from './stores/user.js';
import AppNavigation from './components/app-navigation/AppNavigation.vue';
import { getAuthToken } from './utils/cookies';
import {
  onMounted,
  reactive,
} from 'vue';
import router from './router';

const state = reactive({
  isUserAuthSet: false,
});
const user = useUserStore();

onMounted(async () => {
  await setUserAuth();
  state.isUserAuthSet = true;
});

const setUserAuth = async () => {
  const authToken = getAuthToken();

  if (!authToken) {
    return;
  }

  try {
    const response = await fetch(`${ import.meta.env.VITE_SERVER_URI }auth`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${ authToken }`,
      },
    });

    const responseData = await response.json();

    if (!responseData.user_data) {
      await router.push('/');
      return;
    }

    user.setUserData(responseData.user_data);

  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <router-view v-if='state.isUserAuthSet'></router-view>
</template>
