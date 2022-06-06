<script setup>
import { reactive, watch } from 'vue';
import AppModal from '../../components/AppModal.vue';
import { getAuthToken } from '../../utils/cookies';
import { useToast } from 'vue-toastification';

const props = defineProps({
  'isEditAuthorModalActive': Boolean,
  author: {
    type: Object, default: () => {
    }, required: false,
  },
});

const emit = defineEmits(['toggleEditAuthorModal', 'authorUpdated']);

const state = reactive({
  updatedAuthor: {
    name: '',
    birth_date: '',
  },
});

watch(() => props.isEditAuthorModalActive, async () => {
  if (!props.isEditAuthorModalActive) {
    return;
  }
  state.updatedAuthor = {
    name: props.author.name,
    birth_date: props.author.birth_date,
  };
});

const toggleEditAuthorModal = () => {
  emit('toggleEditAuthorModal');
};

const toast = useToast();

const updateAuthor = async () => {
  try {
    const authorUpdates = state.updatedAuthor;
    const response = await fetch(`${ import.meta.env.VITE_SERVER_URI }authors/${ props.author.id }`, {
      method: 'PUT',
      body: JSON.stringify(authorUpdates),
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${ getAuthToken() }`,
      },
    });
    if (response.status !== 200) {
      toast.error('ERROR: Something went wrong updated this author.');
      return;
    }
    toast.success('Author successfully updated');
    emit('authorUpdated', { ...state.updatedAuthor, id: props.author.id });
    toggleEditAuthorModal();
  } catch (error) {
    console.error(error);
  }
};

</script>

<template>
  <app-modal :is-modal-active='props.isEditAuthorModalActive' @toggle-active-status='toggleEditAuthorModal'>
    <div v-if='author' id='update'>
      <form id='updateAuthor' method='POST' class='app-form' @submit.prevent>
        <legend><strong>Edit Author</strong></legend>
        <fieldset class='fields'>
          <label for='author-name'> name </label>
          <input id='author-name' v-model='state.updatedAuthor.name' type='text' name='name' required>
          <label for='author-birth-date'> birth date </label>
          <input id='author-birth-date' v-model='state.updatedAuthor.birth_date' type='date' name='birth_date' required>
        </fieldset>
        <input id='editAuthor' class='app-button app-button--accept' type='submit' value='Update Author' @click='updateAuthor'>
        <input class='app-button app-button--cancel' type='button' value='Cancel' @click='toggleEditAuthorModal'>
      </form>
    </div><!-- update -->
  </app-modal>
</template>
