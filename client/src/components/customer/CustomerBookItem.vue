<script setup>
import { computed } from 'vue';
import moment from 'moment';

const props = defineProps({
  book: {
    type: Object,
    required: true,
  },
});

const rentedDate = computed(() => {
  return moment(props.book.date_rented).format('MMMM Do, YYYY');
});

const hasMultipleAuthors = computed(() => {
  return props.book.authors.includes(',');
});

</script>

<template>
  <article class='customer-book-item' :class='{"customer-book-item--is-rented": !!book.date_rented}'>
    <picture class='customer-book-item__picture'>
      <img
        :src='book.cover_image'
        :alt='`Book cover for "${book.title}"`'
        class='customer-book-item__image'>
    </picture>
    <div class='customer-book-item__details'>
      <div class='customer-book-item__title customer-book-item__detail'>
        <span class='customer-book-item__author customer-book-item__label'>Title:</span>
        {{ book.title }}
      </div>
      <div class='customer-book-item__author customer-book-item__detail'>
        <span class='customer-book-item__author customer-book-item__label'>
          {{ hasMultipleAuthors ? 'Authors' : 'Author' }}:
        </span>
        {{ book.authors }}
      </div>
      <div class='customer-book-item__genre customer-book-item__detail'>
        <span class='customer-book-item__author customer-book-item__label'>Genre:</span>
        {{ book.genre }}
      </div>
      <time
v-if='book.date_rented' class='customer-book-item__date-rented customer-book-item__detail'
            :datetime='book.date_rented'>
        <span class='customer-book-item__author customer-book-item__label'>Date Rented:</span>
        {{ rentedDate }}
      </time>
    </div>
    <button v-if='book.date_rented' class='customer-book-item__return-button' :aria-label='`Return ${book.title}`'>
      Return Book
    </button>
  </article>
</template>

<style lang='scss'>
.customer-book-item {
  @apply font-semibold text-left w-[30%] mx-[1.5%] flex flex-col rounded-md overflow-hidden shadow-lg mb-10;

  background-color: lighten(#e2e8f0, 3%);

  &__picture {
    @apply block w-full aspect-[2/3] relative;
  }

  &__image {
    @apply object-cover w-full h-full absolute top-0 left-0;
  }

  &__details {
    @apply py-6 px-5;
  }

  &__detail {
    @apply flex leading-tight mb-3;
  }

  &__label {
    @apply mr-2;
  }

  &__return-button.customer-book-item__return-button {
    @apply flex items-center content-center justify-center mt-auto rounded-none py-3 px-5;
  }

  &__return-image {
    @apply w-4 mr-auto relative hidden;

    top: -1px;
  }
}
</style>
