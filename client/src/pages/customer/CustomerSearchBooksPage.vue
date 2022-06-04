<script setup>
import { onMounted } from 'vue';
import { checkUserIsCustomer } from '../../router/middleware.js';
import CustomerLayout from '../../components/layouts/CustomerLayout.vue';

onMounted(async () => {
  await checkUserIsCustomer();
});
</script>

<template>
  <customer-layout>
    <div class='customer-search-books'>
      <h1>Search Books</h1>
      <form action='#' class='search-books-form' @submit.prevent>
        <label for='search-books' class='search-books-form__label'>
          Find a book
        </label>
        <div class='input-group'>
          <input id='search-books' type='text' value='A book title query that might have been entered' class='search-books-form__input'>
          <input type='submit' value='Search'>
        </div>
      </form>
      <table border="1" cellpadding="5" style="margin-left: auto; margin-right: auto;">
        <tr>
          <th>cover</th>
          <th>book title</th>
          <th>author</th>
          <th>genre</th>
          <th>isnb</th>
          <th></th>
          <th></th>
        </tr>
        <tr>
          <th><img src='https://picsum.photos/seed/picsum56/100/150' alt=''></th>
          <th>nulla quisque arcu libero</th>
          <th>Robbi Feild</th>
          <th>Horror</th>
          <th>810394541-2</th>
          <th><a href='#'>Check Out</a></th>
          <th><a href='#'>Add to Wishlist</a></th>
        </tr>
        <tr>
          <th><img src='https://picsum.photos/seed/picsum1/100/150' alt=''></th>
          <th>aliquet massa id lobortis convallis tortor</th>
          <th>Thomasin Seakin</th>
          <th>Horror</th>
          <th>663570720-4</th>
          <th><a href='#'>Check Out</a></th>
          <th><a href='#'>Add to Wishlist</a></th>
        </tr>
        <tr>
          <th><img src='https://picsum.photos/seed/picsum3/100/150' alt=''></th>
          <th>dapibus at diam nam tristique tortor eu</th>
          <th>Adiana Pavlishchev</th>
          <th>Fiction</th>
          <th>711009564-9</th>
          <th><a href='#'>Check Out</a></th>
          <th><a href='#'>Add to Wishlist</a></th>
        </tr>
        <tr>
          <th><img src='https://picsum.photos/seed/picsum2/100/150' alt=''></th>
          <th>convallis tortor risus dapibus augue</th>
          <th>Perren Benzi</th>
          <th>Comedy</th>
          <th>941228042-4</th>
          <th><a href='#'>Check Out</a></th>
          <th><a href='#'>Add to Wishlist</a></th>
        </tr>
        <tr>
          <th><img src='https://picsum.photos/seed/picsum4/100/150' alt=''></th>
          <th>risus auctor sed tristique in tempus</th>
          <th>Perren Benzi</th>
          <th>Drama</th>
          <th>588823922-4</th>
          <th><a href='#'>Check Out</a></th>
          <th><a href='#'>Add to Wishlist</a></th>
        </tr>
      </table>
    </div>
  </customer-layout>
</template>

<style lang='scss'>
.search-books-form {
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 600px;
  max-width: 100%;
  margin: 40px auto;


  &__label {
    width: 100%;

  }

  &__input {
    padding: 10px 15px;
    width: 100%;
  }

  .input-group {
    display: flex;

    input[type="submit"] {
      width: 150px;
      margin-left: 10px;
    }
  }
}
</style>
