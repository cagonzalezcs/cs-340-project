<script setup>
import AppModal from '../../components/AppModal.vue';
const props = defineProps({
  'isViewRentalListModalActive': Boolean,
});
const emit = defineEmits(['toggleViewRentalListModal', 'toggleRemoveFromRentalListModal']);

const toggleViewRentalListModal = () => {
  emit('toggleViewRentalListModal');
};
const toggleRemoveFromRentalListModal = () => {
  emit('toggleRemoveFromRentalListModal');
};
</script>

<template>
  <app-modal :is-modal-active='props.isViewRentalListModalActive' @toggle-active-status='toggleViewRentalListModal'>
    <div id='viewRentalList'>
      <p><strong>All Rental List Books for user_id: 1</strong></p>
      <table border='1' cellpadding='5' style='margin-left: auto; margin-right: auto;'>
        <tr>
          <th>book_id</th>
          <th>title</th>
          <th></th>
        </tr>
        <tr>
          <td>10</td>
          <td>in est risus auctor sed tristique in tempus sit</td>
          <td><button @click='toggleRemoveFromRentalListModal'>Delete</button></td>
        </tr>
        <tr>
          <td>8</td>
          <td>quisque ut erat curabitur gravida nisi at</td>
          <td><button @click='toggleRemoveFromRentalListModal'>Delete</button></td>
        </tr>
      </table>
    </div><!-- viewRentalList -->
  </app-modal>
</template>
