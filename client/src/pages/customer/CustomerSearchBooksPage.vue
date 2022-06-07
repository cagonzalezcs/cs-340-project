<script setup>
import { onMounted, reactive, computed } from 'vue';
import { checkUserIsCustomer } from '../../router/middleware.js';
import CustomerLayout from '../../components/layouts/CustomerLayout.vue';
import { getAuthToken } from '../../utils/cookies';
import { useUserStore } from '../../stores/user';
import { POSITION, useToast } from 'vue-toastification';
import AppModal from '../../components/AppModal.vue';
import { debounce } from 'lodash';

const state = reactive({
  searchInput: '',
  isSearching: true,
  books: [],
  isBookActionModalActive: false,
  currentlySelectedBook: null,
});

const user = useUserStore();

onMounted(async () => {
  await checkUserIsCustomer();

  if (!user.rentalList?.length) {
    await getRentalListItems();
  }

  if (!user.wishList?.length) {
    await getWishListItems();
  }
});

const toggleBookActionModal = () => {
  state.isBookActionModalActive = !state.isBookActionModalActive;
};

const initBookAction = (book) => {
  state.currentlySelectedBook = book;
  toggleBookActionModal();
};

const isUserAbleToWishList = (bookId) => {
  const existingWishListItem = user.wishList.find((book) => book.book_id === bookId);
  const existingRentalListItem = user.rentalList.find((book) => book.book_id === bookId);

  return !existingWishListItem && !existingRentalListItem;
};

const baseUrl = import.meta.env.VITE_SERVER_URI;

const toast = useToast();

const setRentalList = (rentalList) => {
  user.rentalList = rentalList;
};

const setWishList = (wishList) => {
  user.wishList = wishList;
};

async function getRentalListItems() {
  try {
    const response = await fetch(`${ baseUrl }rental-lists/user/${ user.id }`,
      {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${ getAuthToken() }`,
        },
      });

    const rentalListData = await response.json();
    setRentalList(rentalListData);
  } catch (error) {
    console.error(error);
  }
}

async function getWishListItems() {
  try {
    const response = await fetch(`${ baseUrl }wish-lists/user/${ user.id }`,
      {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${ getAuthToken() }`,
        },
      });

    const wishListData = await response.json();
    setWishList(wishListData);
  } catch (error) {
    console.error(error);
  }
}

const addItemToWishList = async () => {
  try {
    const addedRentalItemData = {
      book_id: state.currentlySelectedBook.id,
      user_id: user.id,
    };
    const response = await fetch(`${ import.meta.env.VITE_SERVER_URI }wish-lists/add-book`,
      {
        method: 'POST',
        body: JSON.stringify(addedRentalItemData),
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${ getAuthToken() }`,
        },
      });

    if (response.status === 422) {
      const responseData = await response.json();
      toast.error(responseData.message, {
        position: POSITION.BOTTOM_CENTER,
      });
      return;
    }

    if (response.status !== 200) {
      toast.error('There was an error in adding this book to your wish list. Please try again later', {
        position: POSITION.BOTTOM_CENTER,
      });
      return;
    }

    toast.success(`${ state.currentlySelectedBook.title } has been added to your wish list.`, {
      position: POSITION.BOTTOM_CENTER,
    });
    await getWishListItems();
    toggleBookActionModal();
  } catch (error) {
    console.error(error);
    toast.error(`There was an error in renting your book. ${ error }`, {
      position: POSITION.BOTTOM_CENTER,
    });
  }
};

const completeBookAction = async () => {
  await addItemToWishList();
};

const setBooks = (books) => {
  state.books = books;
};

const searchBookByKeyword = debounce(async () => {
  if (!state.searchInput) {
    setBooks([]);
    state.isSearching = true;
    return;
  }

  const response = await fetch(`${ import.meta.env.VITE_SERVER_URI }books/search/keyword/${ state.searchInput }`,
    {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${ getAuthToken() }`,
      },
    });
  const searchResults = await response.json();
  state.isSearching = false;
  setBooks(searchResults);
}, 500);

const handleSearchInputChange = () => {
  state.isSearching = true;
  searchBookByKeyword();
};
</script>

<template>
  <customer-layout>
    <div class='search-books pb-40'>
      <h1 class='search-books__heading sr-only'>Search Books</h1>
      <form action='#' class='search-books__form' @submit.prevent>
        <label for='search-books' class='search-books__form-label'>
          Search Books
        </label>
        <div class='input-group'>
          <input
            id='search-books'
            v-model='state.searchInput'
            type='text'
            class='search-books__form-input'
            placeholder='Enter a Book Title, Author, Genre, or ISBN Number...'
            @keyup='handleSearchInputChange'>
        </div>
      </form>
      <table
        v-if='state.books?.length'
        border='1'
        cellpadding='5'
        style='margin-left: auto; margin-right: auto;'
        class='search-books__results app-table'>
        <tr>
          <th>cover</th>
          <th>title</th>
          <th>author</th>
          <th>genre</th>
          <th>isnb</th>
          <th></th>
        </tr>
        <tr v-for='book in state.books' :key='book.id'>
          <td>
            <picture class='block w-32 aspect-[2/3] relative'>
              <img
                :src='book.cover_image' :alt='`Book cover for ${book.title}`'
                class='object-cover w-full h-full absolute top-0 left-0' width='128' height='192'>
            </picture>
          </td>
          <td>{{ book.title }}</td>
          <td>{{ book.authors }}</td>
          <td>{{ book.genre }}</td>
          <td>{{ book.isbn }}</td>
          <td class='wish-list-button'>
            <button v-if='isUserAbleToWishList(book.id)' @click='initBookAction(book)'>Add to Wishlist</button>
          </td>
        </tr>
      </table>
      <div v-else-if='state.searchInput && !state.isSearching'>
        <h2 class='mt-24 font-semibold text-xl'>No Books Were Found in Your Search, Please Try a Different Query</h2>
      </div>
    </div>
    <app-modal :is-modal-active='state.isBookActionModalActive' @toggle-active-status='toggleBookActionModal'>
      <div class='book-action-modal'>
        <h2 class='book-action-modal__heading'>
          Would Like To Add This Book to Your Wish List?
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
        <button class='book-action-modal__accept app-button--accept' @click='completeBookAction'>Add Book to Wish List
        </button>
        <button class='book-action-modal__cancel app-button--cancel' @click='toggleBookActionModal'>Cancel
        </button>
      </div>
    </app-modal>
  </customer-layout>
</template>

<style lang='scss'>
.search-books {
  @apply w-[95%] max-w-6xl mx-auto pb-20;

  &__form {
    @apply w-full;

    display: flex;
    flex-direction: column;
    text-align: left;
    width: 700px;
    max-width: 100%;
    margin: 20px auto;


    &-label {
      @apply text-5xl font-bold mb-8 text-neutral-700 text-center;

      width: 100%;
    }

    &-input {
      padding: 10px 15px;
      width: 100%;
    }

    .input-group {
      padding-top: 0;
      margin-top: 0;
    }
  }

  &__results.app-table.app-table.app-table {
    @apply w-full mt-8;

    tr {
      td {
        @apply pl-0 py-0;
      }
    }
  }

  .search-books__form-input {
    background-image: url('@/assets/images/icons/search.svg');
    background-repeat: no-repeat;
    background-size: 24px;
    background-position: 98% 50%;
  }

  .wish-list-button.wish-list-button.wish-list-button.wish-list-button {
    @apply pl-2 ;

    button {
      width: 165px;
    }
  }
}
</style>
