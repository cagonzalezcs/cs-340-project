<script setup>
import { reactive, watch } from 'vue';
import AppModal from '../../components/AppModal.vue';
import { getAuthToken } from '../../utils/cookies';

const baseUrl = import.meta.env.VITE_SERVER_URI;

let state = reactive({
  userWishList: [],
});

const props = defineProps({
  'isUserWishListModalActive': Boolean,
  user: {
    type: Object, default: () => {
    }, required: false,
  },
});

const emit = defineEmits(['toggleUserWishListModal']);

function setUserWishLIst(items) {
  if(items?.length) {
    state.userWishList = items;
  }
};

watch(() => props.isUserWishListModalActive, async () => {
  if(!props.isUserWishListModalActive) {
    state.userWishList = [];
    return;
  }
  let userId = props.user.id;
  try {
    const response = await fetch(`${baseUrl}wish-lists/user/${userId}`, {
      method: 'GET', 
      headers: {
        'Content-type': 'application/json', 
        Authorization: `Bearer ${ getAuthToken() }`,
      },
    });
    const data = await response.json();
    if(!data.length) {
      return;
    }
    setUserWishLIst(data);
  } catch (error) {
    console.error(error);
  }
});

const toggleUserWishListModal = () => {
  emit('toggleUserWishListModal');
};
</script>

<template>
  <app-modal :is-modal-active='props.isUserWishListModalActive' @toggle-active-status='toggleUserWishListModal'>
    <div v-if='props.user' id='viewWishList'>
      <p v-if='state.userWishList.length' class='mb-6 text-xl'><strong>All Wish List Books for User With Id: {{ props.user.id }}</strong></p>
      <table v-if='state.userWishList.length' border='1' cellpadding='5' style='margin-left: auto; margin-right: auto;' class='app-table'>
        <tr>
          <th>book_id</th>
          <th>title</th>
        </tr>
        <tr v-for='item in state.userWishList' :key='item.user_id'>
          <td>{{ item.book_id }}</td>
          <td>{{ item.title }}</td>
        </tr>
      </table>

      <div v-else class='w-30 font-bold text-2xl mt-8 mb-8'>
        No Wish List Items Found for User With Id {{ props.user.id }}
      </div>
    </div><!-- viewWishList by User -->
  </app-modal>
</template>
