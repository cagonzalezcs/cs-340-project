<script setup>
import { computed } from 'vue';
import moment from 'moment';

const props = defineProps({
  book: {
    type: Object,
    required: true,
  },
  isOnRentalList: {
    type: Boolean,
    required: true,
  },
  isRentalSlotAvailable: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const emit = defineEmits(['initBookAction']);

const rentedDate = computed(() => {
  return moment(props.book.date_rented).format('MMMM Do, YYYY');
});

const hasMultipleAuthors = computed(() => {
  return props.book.authors.includes(',');
});

const isRentalUnavailable = computed(() => {
  if (!props.book?.quantity_available || !props.book?.quantity_rented) {
    return false;
  }

  return Number(props.book?.quantity_available) === Number(props.book?.quantity_rented);
});

const initBookAction = (isRemovingFromWishList = false) => {
  emit('initBookAction', props.book, isRemovingFromWishList);
};
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
        v-if='isOnRentalList && book.date_rented'
        class='customer-book-item__date-rented customer-book-item__detail'
        :datetime='book.date_rented'>
        <span class='customer-book-item__author customer-book-item__label'>Date Rented:</span>
        {{ rentedDate }}
      </time>
    </div>
    <div class='customer-book-item__actions'>
      <button
        v-if='isOnRentalList || isRentalSlotAvailable'
        class='customer-book-item__return-button'
        :class='{"customer-book-item__return-button--unavailable": isRentalUnavailable}'
        :aria-label='`${isOnRentalList ? "Return" : "Rent"} ${book.title}`'
        :disabled='isRentalUnavailable'
        @click='initBookAction(false)'>
        {{ isOnRentalList ? 'Return Book' :
        isRentalUnavailable ? 'Book Unavailable' :
          'Rent Book'
        }}
      </button>
      <button v-if='!isOnRentalList' class='customer-book-item__remove-button' @click='initBookAction(true)'>
        Remove Book
      </button>
    </div>
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

  &__actions {
    @apply flex mt-auto;
  }

  .customer-book-item__return-button,
  .customer-book-item__remove-button {
    @apply rounded-none py-3 px-5 w-full leading-none text-sm;
  }

  .customer-book-item__remove-button {
    @apply from-red-400 to-red-600;
  }

  .customer-book-item__return-button--unavailable {
    @apply from-neutral-200 to-neutral-300 text-neutral-400 cursor-not-allowed;
  }
}
</style>
