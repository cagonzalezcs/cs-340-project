<script setup>
import './styles/global.scss';
import { useUserStore } from './stores/user.js';
import checkUserAuth from './router/middleware';
import AppNavigation from './components/app-navigation/AppNavigation.vue';
import { onMounted, watch } from 'vue';
import router from './router';

const user = useUserStore();

onMounted(() => {
  watch(router.currentRoute, checkUserAuth);
});
</script>
 
<template>
  <app-navigation v-if='user.isLoggedIn' />
  <router-view></router-view>
</template>

<style>
#app {
  padding-bottom: 40px;
  overflow: hidden;
}
</style>
