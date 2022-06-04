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
    <div class='customer-wish-list-page'>
      <h1>Wish Listed Books</h1>

      <table border="1" cellpadding="5" style="margin-left: auto; margin-right: auto;">
        <tr>
          <th>book title</th>
          <th>author</th>
          <th>genre</th>
          <th></th>
          <th></th>
        </tr>
        <tr>
          <th>dapibus at diam nam tristique tortor eu</th>
          <th>Adiana Pavlishchev</th>
          <th>Fiction</th>
          <th><a href='#'>Check Out</a></th>
          <th><a href='#'>Remove</a></th>
        </tr>
        <tr>
          <th>convallis tortor risus dapibus augue</th>
          <th>Perren Benzi</th>
          <th>Comedy</th>
          <th><a href='#'>Check Out</a></th>
          <th><a href='#'>Remove</a></th>
        </tr>
        <tr>
          <th>aliquet massa id lobortis convallis tortor</th>
          <th>Thomasin Seakin</th>
          <th>Horror</th>
          <th><a href='#'>Check Out</a></th>
          <th><a href='#'>Remove</a></th>
        </tr>
        <tr>
          <th>nulla quisque arcu libero</th>
          <th>Robbi Feild</th>
          <th>Horror</th>
          <th><a href='#'>Check Out</a></th>
          <th><a href='#'>Remove</a></th>
        </tr>
        <tr>
          <th>risus auctor sed tristique in tempus</th>
          <th>Perren Benzi</th>
          <th>Drama</th>
          <th><a href='#'>Check Out</a></th>
          <th><a href='#'>Remove</a></th>
        </tr>
      </table>
    </div>
  </customer-layout>
</template>
