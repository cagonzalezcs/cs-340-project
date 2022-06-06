<script setup>
import { reactive, computed } from 'vue';
import CustomerBookItem from './CustomerBookItem.vue';
import AppModal from '../../components/AppModal.vue';
import { useUserStore } from '../../stores/user';
import { getAuthToken } from '../../utils/cookies';
import { POSITION, useToast } from 'vue-toastification';

const props = defineProps({
  heading: {
    type: String,
    default: '',
    required: false,
  },
  books: {
    type: Array,
    required: true,
  },
  isRentalsList: {
    type: Boolean,
    default: false,
  },
  totalOnRentalList: {
    type: Number,
    default: 0,
  },
  totalOnWishList: {
    type: Number,
    default: 0
  }
});

const user = useUserStore();
const toast = useToast();

const emit = defineEmits(['rentalListItemDeleted', 'wishListItemDeleted', 'rentalListItemAdded']);

const state = reactive({
  isBookActionModalActive: false,
  currentlySelectedBook: null,
  isRemovingFromWishList: false,
});

const isRentalSlotAvailable = computed(() => {
  return props.totalOnRentalList < 3;
});

const toggleBookActionModal = () => {
  state.isBookActionModalActive = !state.isBookActionModalActive;
};

const initBookAction = (book, isRemovingFromWishList = false) => {
  state.currentlySelectedBook = book;
  state.isRemovingFromWishList = isRemovingFromWishList;
  toggleBookActionModal();
};

const completeBookAction = () => {
  if (props.isRentalsList) {
    deleteRentalListItem();
    return;
  }

  if (state.isRemovingFromWishList) {
    deleteItemFromWishList();
    return;
  }

  addItemToRentalList();
};

const deleteRentalListItem = async () => {
  try {
    const rentalListItemToDelete = {
      book_id: state.currentlySelectedBook.book_id,
      user_id: user.id,
    };
    const response = await fetch(`${ import.meta.env.VITE_SERVER_URI }rental-lists/`,
      {
        method: 'DELETE',
        body: JSON.stringify(rentalListItemToDelete),
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${ getAuthToken() }`,
        },
      });

    if (response.status !== 200) {
      toast.error('There was an error in returning your book. Please try again later', {
        position: POSITION.BOTTOM_CENTER,
      });
      return;
    }

    toast.success(`${state.currentlySelectedBook.title} has been successfully returned.`, {
      position: POSITION.BOTTOM_CENTER,
    });
    toggleBookActionModal();
    emit('rentalListItemDeleted');
  } catch (error) {
    console.error(error);
    toast.error(`There was an error in returning your book. ${ error }`, {
      position: POSITION.BOTTOM_CENTER,
    });
  }
};

const deleteItemFromWishList = async () => {
  try {
    const rentalListItemToDelete = {
      book_id: state.currentlySelectedBook.book_id,
      user_id: user.id,
    };
    const response = await fetch(`${ import.meta.env.VITE_SERVER_URI }wish-lists/`,
      {
        method: 'DELETE',
        body: JSON.stringify(rentalListItemToDelete),
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${ getAuthToken() }`,
        },
      });

    if (response.status !== 200) {
      toast.error('There was an error in removing your book from your wish list. Please try again later', {
        position: POSITION.BOTTOM_CENTER,
      });
      return;
    }

    toast.success(`${state.currentlySelectedBook.title} has been successfully removed from your wish list.`, {
      position: POSITION.BOTTOM_CENTER,
    });
    toggleBookActionModal();
    emit('wishListItemDeleted');
  } catch (error) {
    console.error(error);
    toast.error(`There was an error in removing your from your wish list. ${ error }`, {
      position: POSITION.BOTTOM_CENTER,
    });
  }
};

const addItemToRentalList = async () => {
  try {
    const addedRentalItemData = {
      book_id: state.currentlySelectedBook.book_id,
      user_id: user.id,
    };
    const response = await fetch(`${ import.meta.env.VITE_SERVER_URI }rental-lists/rent-book`,
      {
        method: 'POST',
        body: JSON.stringify(addedRentalItemData),
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${ getAuthToken() }`,
        },
      });

    if (response.status === 422) {
      toast.error('We\'re unable to rent this book at the moment. You can only rent up to three books at a time.', {
        position: POSITION.BOTTOM_CENTER,
      });
      return;
    }

    if (response.status !== 200) {
      toast.error('There was an error in renting your book. Please try again later', {
        position: POSITION.BOTTOM_CENTER,
      });
      return;
    }

    toast.success(`${state.currentlySelectedBook.title} has been successfully added to your rentals list.`, {
      position: POSITION.BOTTOM_CENTER,
    });
    toggleBookActionModal();
    emit('rentalListItemAdded');
  } catch (error) {
    console.error(error);
    toast.error(`There was an error in renting your book. ${ error }`, {
      position: POSITION.BOTTOM_CENTER,
    });
  }
};
</script>

<template>
  <div class='customer-book-grid'>
    <h2 v-if='heading' class='customer-book-grid__heading'>
      <span class='customer-book-grid__heading-mask'>
        {{ heading }}
      </span>
    </h2>
    <div v-if='isRentalsList' class='customer-book-grid__items customer-book-grid__items--rentals'>
      <customer-book-item
        v-for='book in books'
        :key='book.book_id'
        :book='book'
        :is-on-rental-list='isRentalsList'
        :is-rental-slot-available='isRentalSlotAvailable'
        class='customer-book-grid__item customer-book-grid__item--rental'
        @init-book-action='initBookAction' />
      <article v-for='index in (3 - totalOnRentalList)' :key='index' class='customer-book-grid__empty-item'>
        Select A Book From<br>Your Wish List To Rent
      </article>
    </div>
    <div v-else class='customer-book-grid__items'>
      <customer-book-item
        v-for='book in books'
        :key='book.book_id'
        :book='book'
        :is-on-rental-list='isRentalsList'
        :is-rental-slot-available='isRentalSlotAvailable'
        class='customer-book-grid__item'
        @init-book-action='initBookAction' />
      <div v-if='!totalOnWishList' class='customer-book-grid__no-wish-list-items'>
        <h3 class='customer-book-grid__no-wish-list-heading'>No Wish List Items Found</h3>
        <p class='customer-book-grid__no-wish-list-description'>Search Our Selection of Books to Add to Your Wish List!</p>
        <router-link
          to='/search-books'
          class='customer-book-grid__no-wish-list-link app-button'
        >
          Search Books
        </router-link>
      </div>
    </div>
  </div>
  <app-modal :is-modal-active='state.isBookActionModalActive' @toggle-active-status='toggleBookActionModal'>
    <div class='book-action-modal'>
      <h2 class='book-action-modal__heading'>
        Are You Sure You Would Like To {{ isRentalsList ?
        'Return' :
        state.isRemovingFromWishList ?
          'Remove' :
          'Rent' }} This Book {{ state.isRemovingFromWishList ? 'From Your Wish List' : '' }}?
      </h2>
      <div class='book-action-modal__book'>
        <picture class='book-action-modal__book-picture'>
          <img
            :src='state.currentlySelectedBook.cover_image'
            :alt='`Book cover for "${state.currentlySelectedBook.title}"`'
            class='book-action-modal__book-image'>
        </picture>
        <div class='book-action-modal__book-title'>
          {{ state.currentlySelectedBook.title }}
        </div>
        <div class='book-action-modal__book-author'>
          by {{ state.currentlySelectedBook.authors }}
        </div>
      </div>
      <button class='book-action-modal__accept app-button--accept' @click='completeBookAction'>Confirm
        {{ isRentalsList ?
          'Return' :
          state.isRemovingFromWishList ?
            'Removal' :
            'Rental' }}
      </button>
      <button class='book-action-modal__cancel app-button--cancel' @click='toggleBookActionModal'>Cancel
        {{ isRentalsList ?
          'Return' :
          state.isRemovingFromWishList ?
            'Removal' :
            'Rental' }}
      </button>
    </div>
  </app-modal>
</template>

<style lang='scss'>
.customer-book-grid {
  @apply mb-16;

  &__heading {
    @apply relative text-left text-3xl font-bold mb-8 text-neutral-700;

    &::before {
      @apply absolute z-0 content-[''] w-[97.5%] h-0.5 bg-blue-800;

      left: 1px;
      top: 50%;
      transform: translateY(-50%);
    }

    &-mask {
      @apply relative z-10 pl-[1.5%] bg-neutral-50 pr-6;
    }
  }

  &__items {
    @apply flex flex-wrap justify-start w-full;

    &--rentals {
      @apply mb-20;
    }
  }

  &__item--rental {
    @apply mb-0;
  }

  &__empty-item {
    @apply w-[30%] mx-[1.5%] border-4 border-dashed border-neutral-400 block flex items-center content-center justify-center font-bold text-lg text-neutral-600;
  }

  &__no-wish-list {
    &-items {
      @apply w-full flex items-center content-center justify-center flex-col mt-20 mb-40 font-semibold;

      .app-button.app-button {
        @apply from-neutral-600 to-neutral-800 max-w-full w-[250px];

      }
    }

    &-heading {
      @apply text-4xl font-bold mb-4;
    }

    &-description {
      @apply text-xl mb-10;
    }
  }
}

.book-action-modal {
  @apply flex flex-wrap items-center content-center justify-center max-w-3xl pt-2;

  &__heading {
    @apply font-bold text-3xl mb-8 w-full;
  }

  &__book {
    @apply w-full;

    &-picture {
      @apply block w-full aspect-[2/3] relative max-w-[250px] mx-auto mb-4;
    }

    &-image {
      @apply object-cover w-full h-full absolute top-0 left-0 ;
    }

    &-title,
    &-author {
      @apply font-semibold;
    }

    &-title {
      @apply text-2xl leading-tight mb-2;
    }

    &-author {
      @apply text-lg max-w-lg mx-auto leading-tight mb-10;
    }
  }

  &__accept,
  &__cancel {
    @apply mb-4 mx-4 max-w-full w-[250px];
  }
}
</style>
