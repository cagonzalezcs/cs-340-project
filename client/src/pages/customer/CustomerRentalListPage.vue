<script setup>
import { onMounted } from 'vue';
import { checkUserIsCustomer } from '../../router/middleware.js';

onMounted(async () => {
  await checkUserIsCustomer();
});
</script>

<template>
  <div class='customer-rental-list-page'>
    <h1>Currently Rented Books</h1>

    <table border="1" cellpadding="5" style="margin-left: auto; margin-right: auto;">
      <tr>
        <th>book title</th>
        <th>author</th>
        <th>genre</th>
        <th>date rented</th>
        <th></th>
      </tr>
      <tr>
        <th>dapibus at diam nam tristique tortor eu</th>
        <th>Adiana Pavlishchev</th>
        <th>Fiction</th>
        <th>March 5, 2022</th>
        <th><a href='#'>Return</a></th>
      </tr>
      <tr>
        <th>convallis tortor risus dapibus augue</th>
        <th>Perren Benzi</th>
        <th>Comedy</th>
        <th>March 2, 2022</th>
        <th><a href='#'>Return</a></th>
      </tr>
    </table>
  </div>
</template>
