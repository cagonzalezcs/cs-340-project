<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const currentRoute = computed(() => {
  return useRoute().path;
});
</script>

<template>
  <nav class='app-navigation__links customer-navigation__links'>
    <router-link
      to='/my-books'
      class='app-navigation__link customer-navigation__link'
      :class='{"customer-navigation__link--active": currentRoute === "/my-books"}'
    >
      My Books
    </router-link>
    <router-link
      to='/search-books'
      class='app-navigation__link customer-navigation__link'
      :class='{"customer-navigation__link--active": currentRoute === "/search-books"}'
    >
      Search Books
    </router-link>
  </nav>
</template>

<style lang='scss'>
.customer-navigation {
  &__links {
    @apply h-full flex items-center content-center justify-center;
  }

  &__link {
    @apply h-full px-6 flex items-center content-center justify-center transition-colors bg-transparent;

    &:hover,
    &--active {
      @apply bg-black/20;
    }
  }
}
</style>
