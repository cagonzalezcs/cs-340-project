<script setup>
import { onMounted, reactive, computed } from 'vue';
import AppModal from '../../components/AppModal.vue';
import { useAdminStore } from '../../stores/admin';
import { getAuthToken } from '../../utils/cookies';
import { POSITION, useToast } from 'vue-toastification';

const adminStore = useAdminStore();

const toast = useToast();

onMounted(async () => {
  if (!adminStore.books.length) {
    await getBooks();
  }

  if (!adminStore.users.length) {
    await getUsers();
  }
});

const state = reactive({
  selectedUserIndex: 0,
  selectedBookIndex: 0,
});

const baseUrl = import.meta.env.VITE_SERVER_URI;

const props = defineProps({
  isAddToWishListModalActive: Boolean,
});
const emit = defineEmits(['toggleAddToWishListModal', 'wishListItemAdded']);

const toggleAddToWishListModal = () => {
  state.selectedUserIndex = 0;
  state.selectedBookIndex = 0;
  emit('toggleAddToWishListModal');
};

function setBooks(books) {
  adminStore.books = books?.length ? books : [];
}

async function getBooks() {
  const bookUrl = `${ baseUrl }books`;
  try {
    const response = await fetch(bookUrl, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${ getAuthToken() }`,
      },
    });
    const data = await response.json();
    if (!data.length) {
      return;
    }
    setBooks(data);
  } catch (error) {
    console.error(error);
  }
}

const currentlySelectedUser = computed(() => {
  return adminStore.users[state.selectedUserIndex];
});

const currentlySelectedBook = computed(() => {
  return adminStore.books[state.selectedBookIndex];
});

const setUsers = (users) => {
  adminStore.users = users?.length ? users : [];
};

const getUsers = async () => {
  const usersUrl = `${ baseUrl }users`;
  try {
    const response = await fetch(usersUrl, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${ getAuthToken() }`,
      },
    });
    const data = await response.json();
    if (!data.length) {
      return;
    }
    setUsers(data);
  } catch (error) {
    console.error(error);
  }
};

const addItemToWishList = async () => {
  try {
    const addedRentalItemData = {
      book_id: currentlySelectedBook.value.id,
      user_id: currentlySelectedUser.value.id,
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

    toast.success(`${ currentlySelectedBook.value.title } has been added to your wish list.`, {
      position: POSITION.BOTTOM_CENTER,
    });

    state.selectedUserIndex = 0;
    state.selectedBookIndex = 0;
    emit('wishListItemAdded');
  } catch (error) {
    console.error(error);
    toast.error(`There was an error in renting your book. ${ error }`, {
      position: POSITION.BOTTOM_CENTER,
    });
  }
};
</script>

<template>
  <app-modal :is-modal-active='props.isAddToWishListModalActive' @toggle-active-status='toggleAddToWishListModal'>
    <div id='add' style='display: block'>
      <form id='addWishListBook' method='POST' class='app-form' @submit.prevent>
        <legend><strong>Add Book to Wish List</strong></legend>
        <fieldset class='fields'>
          <label for='app-user'>User</label>
          <select id='app-user' v-model='state.selectedUserIndex' name='app-user'>
            <option v-for='(user, index) in adminStore.users' :key='user.id' :value='index'>
              Id: {{ user.id }} - {{ user.first_name }} {{ user.last_name }}
            </option>
          </select>
          <label for='app-book'>Book</label>
          <select id='app-book' v-model='state.selectedBookIndex' name='app-book'>
            <option v-for='(book, index) in adminStore.books' :key='book.id' :value='index'>
              Id: {{ book.id }} - {{ book.title }}
            </option>
          </select>
        </fieldset>
        <input
id='AddWishListBook' class='app-button app-button--accept' type='submit' value='Add Book To Wish List'
               @click='addItemToWishList'>
        <input class='app-button app-button--cancel' type='button' value='Cancel' @click='toggleAddToWishListModal'>
      </form>
    </div><!-- addWishListItem -->
  </app-modal>
</template>
