<script setup>
import CustomerBookItem from './CustomerBookItem.vue';

defineProps({
  heading: {
    type: String,
    default: '',
    required: false,
  },
  books: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <div class='customer-book-grid'>
    <h2 v-if='heading' class='customer-book-grid__heading'>
      <span class='customer-book-grid__heading-mask'>
        {{ heading }}
      </span>
    </h2>
    <div class='customer-book-grid__items'>
      <customer-book-item v-for='book in books' :key='book.book_id' :book='book' class='customer-book-grid__item' />
    </div>
  </div>
</template>

<style lang='scss'>
.customer-book-grid {
  @apply mb-16;

  &__heading {
    @apply relative text-left text-3xl font-bold mb-6;

    &::before {
      @apply absolute z-0 content-[''] w-[98%] h-0.5 bg-blue-900;

      left: 1px;
      top: 50%;
      transform: translateY(-50%);
    }

    &-mask {
      @apply relative z-10 pl-[1%] bg-neutral-50 pr-5;
    }
  }

  &__items {
    @apply flex flex-wrap justify-start;
  }
}
</style>
