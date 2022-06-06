<script setup>
import { onMounted, reactive } from 'vue';
import { checkUserIsLoggedOut } from '../../router/middleware.js';
import router from '../../router';
import AuthLayout from '../../components/layouts/AuthLayout.vue';
import { useToast } from 'vue-toastification';

onMounted(async () => {
  await checkUserIsLoggedOut();
});

const toast = useToast();

const formData = reactive({
  first_name: '',
  last_name: '',
  email: '',
  address_line_1: '',
  address_line_2: '',
  city: '',
  state: '',
  zip: '',
  password: '',
  password_confirm: '',
});

const registerUser = async () => {
  if (!formData.password) {
    toast.info('A password is required to create an account.');
    return;
  }

  if (!formData.first_name || !formData.last_name || !formData.email || !formData.address_line_1 || !formData.city || !formData.state || !formData.zip) {
    toast.error('Please fill out all required fields.');
    return;
  }

  if (formData.password !== formData.password_confirm) {
    toast.error('Please confirm your passwords match.');
    return;
  }

  try {
    const response = await fetch(`${ import.meta.env.VITE_SERVER_URI }users/register`, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-type': 'application/json',
      },
    });

    if (response.status === 422) {
      toast.info('A user with that email address has previously registered, please use a different email address.');
      return;
    }

    if (response.status !== 200) {
      toast.error('An error occurred while attempting to create your user. Please try again later.');
      return;
    }

    toast.success('User registered successfully, you can now log in to your account');
    router.push('/');
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <auth-layout heading='Create Your Account' link-route='/' link-text='Back to Login'>
    <template #form-fields>
      <label for='registration-first-name' class='registration-form__label registration-form__label--half auth-layout__form-label'>
        <span class='registration-form__label-text auth-layout__form-label-text'>First Name</span>
        <input
          id='registration-first-name'
          v-model='formData.first_name' type='text' name='first-name' class='registration-form__input auth-layout__form-input'
          required />
      </label>

      <label for='registration-last-name' class='registration-form__label registration-form__label--half auth-layout__form-label'>
        <span class='registration-form__label-text auth-layout__form-label-text'>Last Name</span>
        <input
          id='registration-last-name' v-model='formData.last_name' type='text' name='last-name'
          class='registration-form__input auth-layout__form-input' required />
      </label>

      <label for='registration-email' class='registration-form__label auth-layout__form-label'>
        <span class='registration-form__label-text auth-layout__form-label-text'>Email Address</span>
        <input
          id='registration-email' v-model='formData.email' type='email' name='email'
          class='registration-form__input auth-layout__form-input' required />
      </label>

      <label for='registration-address-line-1' class='registration-form__label auth-layout__form-label'>
        <span class='registration-form__label-text auth-layout__form-label-text'>Address Line 1</span>
        <input
          id='registration-address-line-1' v-model='formData.address_line_1' type='text' name='address-line-1'
          class='registration-form__input auth-layout__form-input'
          required />
      </label>

      <label for='registration-address-line-2' class='registration-form__label auth-layout__form-label'>
        <span class='registration-form__label-text auth-layout__form-label-text'>Address Line 2</span>
        <input
          id='registration-address-line-2' v-model='formData.address_line_2' type='text' name='address-line-2'
          class='registration-form__input auth-layout__form-input' />
      </label>

      <label for='registration-city' class='registration-form__label registration-form__label--third auth-layout__form-label'>
        <span class='registration-form__label-text auth-layout__form-label-text'>City</span>
        <input
          id='registration-city' v-model='formData.city' type='text' name='city'
          class='registration-form__input auth-layout__form-input' required />
      </label>

      <label for='registration-state' class='registration-form__label registration-form__label--third auth-layout__form-label'>
        <span class='registration-form__label-text auth-layout__form-label-text'>State</span>
        <input
          id='registration-state' v-model='formData.state' type='text' name='state'
          class='registration-form__input auth-layout__form-input' required />
      </label>

      <label for='registration-zip' class='registration-form__label registration-form__label--third auth-layout__form-label'>
        <span class='registration-form__label-text auth-layout__form-label-text'>Zip</span>
        <input
          id='registration-zip' v-model='formData.zip' type='text' name='zip' class='registration-form__input auth-layout__form-input'
          required />
      </label>

      <label for='registration-password' class='registration-form__label auth-layout__form-label'>
        <span class='registration-form__label-text auth-layout__form-label-text'>Password</span>
        <input
          id='registration-password' v-model='formData.password' type='password' name='password'
          class='registration-form__input auth-layout__form-input' required>
      </label>

      <label for='registration-confirm-password' class='registration-form__label auth-layout__form-label'>
        <span class='registration-form__label-text auth-layout__form-label-text'>Confirm Password</span>
        <input
          id='registration-confirm-password' v-model='formData.password_confirm' type='password'
          name='confirm-password' class='registration-form__input auth-layout__form-input' required>
      </label>
      <input type='submit' value='Create Account' class='registration-form__submit auth-layout__form-submit' @click='registerUser'>
    </template>
  </auth-layout>
</template>

<style lang='scss'>
.registration-form {
  &__label {
    &--half {
      @screen sm {
        width: 48%;
      }
    }

    &--third {
      @screen sm {
        width: 31%;
      }
    }
  }
}
</style>
