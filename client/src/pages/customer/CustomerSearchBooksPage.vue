<script setup>
import { onMounted, reactive } from 'vue';
import { checkUserIsCustomer } from '../../router/middleware.js';
import CustomerLayout from '../../components/layouts/CustomerLayout.vue';

const searchForm = reactive({
  value: ''
});

onMounted(async () => {
  await checkUserIsCustomer();
});
</script>

<template>
  <customer-layout>
    <div class='search-books'>
      <h1 class='search-books__heading'>Search Books</h1>
      <form action='#' class='search-books__form' @submit.prevent>
        <label for='search-books' class='search-books__form-label'>
          Find a book
        </label>
        <div class='input-group'>
          <input id='search-books' v-model='searchForm.value' type='text' class='search-books__form-input'>
        </div>
      </form>
      <table border="1" cellpadding="5" style="margin-left: auto; margin-right: auto;" class='search-books__results app-table'>
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
          <td><img src='https://picsum.photos/seed/picsum56/100/150' alt=''></td>
          <td>nulla quisque arcu libero</td>
          <td>Robbi Feild</td>
          <td>Horror</td>
          <td>810394541-2</td>
          <td><button>Check Out</button></td>
          <td><button>Add to Wishlist</button></td>
        </tr>
      </table>
    </div>
  </customer-layout>
</template>

<style lang='scss'>
.search-books {
  @apply w-[95%] max-w-6xl mx-auto pb-20;

  &__heading {
    @apply text-5xl font-bold mb-14 text-neutral-700;
  }

  &__form {
    @apply w-full;

    display: flex;
    flex-direction: column;
    text-align: left;
    max-width: 100%;
    margin: 40px auto;


    &-label {
      @apply font-semibold mb-2 ml-1;

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
    @apply w-full;

    tr {
      td {
        @apply pl-0 py-0;
      }
    }
  }
}
</style>
