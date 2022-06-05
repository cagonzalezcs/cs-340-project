<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const currentRoute = computed(() => {
  return useRoute().path;
});
</script>

<template>
  <nav class='app-navigation__links admin-navigation__links'>
    <router-link
      to='/admin/users'
      class='app-navigation__link admin-navigation__link'
      :class='{"admin-navigation__link--active": currentRoute === "/admin/users"}'
    >
      <img src='@/assets/images/icons/users.svg' alt='' class='admin-navigation__icon admin-navigation__icon--users'>
      Users
    </router-link>
    <router-link
      to='/admin/roles'
      class='app-navigation__link admin-navigation__link'
      :class='{"admin-navigation__link--active": currentRoute === "/admin/roles"}'
    >
      <img src='@/assets/images/icons/roles.svg' alt='' class='admin-navigation__icon admin-navigation__icon--roles'>
      Roles
    </router-link>
    <router-link
      to='/admin/books'
      class='app-navigation__link admin-navigation__link'
      :class='{"admin-navigation__link--active": currentRoute === "/admin/books"}'
    >
      <img src='@/assets/images/icons/books.svg' alt='' class='admin-navigation__icon admin-navigation__icon--books'>
      Books
    </router-link>
    <router-link
      to='/admin/authors'
      class='app-navigation__link admin-navigation__link'
      :class='{"admin-navigation__link--active": currentRoute === "/admin/authors"}'
    >
      <img
src='@/assets/images/icons/authors.svg' alt=''
           class='admin-navigation__icon admin-navigation__icon--authors'>
      Authors
    </router-link>
    <router-link
      to='/admin/genres'
      class='app-navigation__link admin-navigation__link'
      :class='{"admin-navigation__link--active": currentRoute === "/admin/genres"}'
    >
      <img src='@/assets/images/icons/genres.svg' alt='' class='admin-navigation__icon admin-navigation__icon--genres'>
      Genres
    </router-link>
  </nav>
</template>

<style lang='scss'>
.admin-navigation {
  &__links {
    @apply flex flex-col text-left mt-8 py-4;
  }

  &__link {
    @apply flex items-center content-center justify-start relative py-3.5 pr-2 pl-[5rem] w-full transition-colors;

    &:hover,
    &--active {
      background: darken(#1e3a8a, 13);
    }
  }

  &__icon {
    @apply w-8 mr-5 inline-block absolute left-6 top-1/2;

    transform: translateY(-50%);

    &--roles {
      @apply w-[1.8rem];
    }

    &--books,
    &--genres {
      @apply w-[1.875rem];
    }

    &--authors {
      @apply w-[1.8rem] ml-0.5;
    }
  }
}
</style>
