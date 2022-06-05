<script setup>
import { onMounted, reactive } from 'vue';
import { checkUserIsCustomer } from '../../router/middleware.js';
import { getAuthToken } from '../../utils/cookies';
import { useUserStore } from '../../stores/user';
import CustomerLayout from '../../components/layouts/CustomerLayout.vue';
import CustomerBookGrid from '../../components/customer/CustomerBookGrid.vue';

onMounted(async () => {
  await checkUserIsCustomer();
  getRentalListItems().catch(error => console.error(error));
  getWishListItems().catch(error => console.error(error));
});

const user = useUserStore();
const userBooks = reactive({
  rentalList: [],
  wishList: [],
});

const setRentalList = (rentalList) => {
  if (rentalList?.length) {
    userBooks.rentalList = rentalList;
  }
};

const setWishList = (wishList) => {
  if (wishList?.length) {
    userBooks.wishList = wishList;
  }
};

const baseUrl = import.meta.env.VITE_SERVER_URI;

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
</script>

<template>
  <customer-layout>
    <div class='my-books'>
      <header class='my-books__header'>
        <h1 class='my-books__heading'>My Books</h1>
      </header>
      <customer-book-grid heading='Currently Rented Books' :books='userBooks.rentalList'></customer-book-grid>
      <customer-book-grid heading='Books Wish List' :books='userBooks.wishList'></customer-book-grid>
    </div>
  </customer-layout>
</template>

<style lang='scss'>
.my-books {
  @apply w-[95%] max-w-7xl mx-auto;

  &__heading {
    @apply text-5xl font-semibold mb-14;
  }
}
</style>
