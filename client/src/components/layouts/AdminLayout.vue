<script setup>
import AppNavigation from '../app-navigation/AppNavigation.vue';
import AppNavigationAdmin from '../app-navigation/AppNavigationAdmin.vue';
</script>

<template>
  <div class='admin-layout'>
    <app-navigation class='admin-layout__navigation' is-admin-navigation>
      <template #logoText>
        <span class='admin-layout__logo-top'>
          Novel Pursuits
        </span>
        <span class='admin-layout__logo-bottom'>
          Admin Dashboard
        </span>
      </template>
      <template #navigationItems>
        <app-navigation-admin class='app-navigation__items' />
      </template>
    </app-navigation>
    <section class='admin-layout__main'>
      <slot></slot>
    </section>
  </div>
</template>

<style lang='scss'>
.admin-layout{
  &__logo-top {
    @apply text-sm pt-6;
  }

  &__logo-bottom {
    @apply text-lg;
  }

  &__logo-top,
  &__logo-bottom {
    @apply block text-left leading-tight px-6;
  }

  &__main {
    @apply pl-[260px] pr-10 py-10;
  }

  .app-navigation {
    &--admin {
      @apply overflow-auto flex-col w-[220px] h-screen from-zinc-800 to-zinc-900 p-0;
    }

    &__logout-button {
      @apply from-zinc-700 to-zinc-800 mt-auto rounded-none shadow-none;

      &:hover {
        transform: none;
        box-shadow: none;
      }
    }
  }
}
</style>
