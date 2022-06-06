<script setup>
import { reactive, watch } from 'vue';
import AppModal from '../../components/AppModal.vue';
import { getAuthToken } from '../../utils/cookies';

const baseUrl = import.meta.env.VITE_SERVER_URI;

let state = reactive({
  userRentalList: [],
}); 

const props = defineProps({
  'isUserRentalListModalActive': Boolean,
  user: {
    type: Object, default: () => {
    }, required: false,
  },
});

const emit = defineEmits(['toggleUserRentalListModal']);

function setUserRentalList(items) {
  if(items?.length) {
    state.userRentalList = items;
  }
};

watch(() => props.isUserRentalListModalActive, async () => {
  if(!props.isUserRentalListModalActive) {
    state.userRentalList = [];
    return;
  }
  let userId = props.user.id;
  try {
    const response = await fetch(`${baseUrl}users/rental-list/${userId}`, {
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
    setUserRentalList(data);
  } catch (error) {
    console.error(error);
  }
});


const toggleUserRentalListModal = () => {
  emit('toggleUserRentalListModal');
};

</script>

<template>
  <app-modal :is-modal-active='props.isUserRentalListModalActive' @toggle-active-status='toggleUserRentalListModal'>
    <div v-if='props.user' id='viewRentalList'>
      <p><strong>All Rental List Books for user_id: {{ props.user.id }}</strong></p>
      <table border='1' cellpadding='5' style='margin-left: auto; margin-right: auto;'>
        <tr>
          <th>book_id</th>
          <th>title</th>
        </tr>
        <tr v-for='(item) in state.userRentalList' :key='item.user_id'>
          <td>{{ item.id }}</td>
          <td>{{ item.title }}</td>
        </tr>
      </table>
    </div><!-- viewRentalList by user -->
  </app-modal>
</template>
