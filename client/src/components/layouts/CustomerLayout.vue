<script setup>
import AppNavigation from '../app-navigation/AppNavigation.vue';
import AppNavigationCustomer from '../app-navigation/AppNavigationCustomer.vue';
</script>

<template>
  <div class='customer-layout'>
    <app-navigation class='customer-layout__navigation'>
      <template #logoText>
        Novel Pursuits
      </template>
      <template #navigationItems>
        <app-navigation-customer class='app-navigation__items' />
      </template>
    </app-navigation>
    <section class='customer-layout__main'>
      <slot></slot>
    </section>
  </div>
</template>

<style lang='scss'>
.customer-layout {
  &__main {
    @apply pt-28;
  }

  .app-navigation {
    &--customer {
      @apply flex items-center content-center w-full h-14;
    }

    &__logo {
      @apply mr-auto text-2xl ml-6 leading-none;
    }

    &__logout-button {
      @apply w-32 h-full py-2 rounded-none shadow-none;

      &:hover {
        @apply shadow-none;

        transform: none;
      }
    }
  }
}
</style>
