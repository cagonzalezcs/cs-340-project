<script setup>
import { useUserStore } from '../../stores/user';
import router from '../../router';

const user = useUserStore();

defineProps({
  isAdminNavigation: {
    type: Boolean,
    required: false,
    default: false,
  },
});

async function logUserOut() {
  await user.logout();
  await router.push('/');
}
</script>

<template>
  <div class='app-navigation' :class='{ "app-navigation--admin": isAdminNavigation, "app-navigation--customer": !isAdminNavigation }'>
    <div class='app-navigation__logo'>
      <slot name='logoText' />
    </div>

    <slot name='navigationItems' />
    <button class='app-navigation__logout-button' @click='logUserOut'>Logout</button>
  </div>
</template>

<style lang='scss'>
.app-navigation {
  @apply fixed top-0 left-0 z-50 flex bg-gradient-to-br from-blue-800 to-blue-900;

  &__logo,
  &__inner {
    @apply text-white font-bold;
  }

  &__link {
    @apply text-white font-semibold;
  }
}
</style>
