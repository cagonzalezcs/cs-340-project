<script setup>
import { onMounted, reactive } from 'vue';
import { checkUserIsLoggedOut } from '../../router/middleware.js';
import router from '../../router';

onMounted(async () => {
  await checkUserIsLoggedOut();
});

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
  if (formData.password !== formData.password_confirm) {
    alert('Please confirm your passwords match.');
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
      alert('A user with that email address has previously registered, please use a different email address.');
      return;
    }

    if (response.status !== 200) {
      alert('An error occurred while attempting to create your user. Please try again later.');
      return;
    }

    alert('User registered successfully, you can now log in to your account');
    router.push('/');
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <div class='registration-page'>
    <div class='registration-page__inner'>
      <h1 class='registration-page__title'>
        Create Your Account
      </h1>

      <form action='#' class='registration-form' @submit.prevent>
        <fieldset class='registration-form__fields'>
          <label for='registration-first-name' class='registration-form__label registration-form__label--half'>
            <span class='registration-form__label-text'>First Name</span>
            <input
              id='registration-first-name'
              v-model='formData.first_name' type='text' name='first-name' class='registration-form__input'
              required />
          </label>

          <label for='registration-last-name' class='registration-form__label registration-form__label--half'>
            <span class='registration-form__label-text'>Last Name</span>
            <input
              id='registration-last-name' v-model='formData.last_name' type='text' name='last-name'
              class='registration-form__input' required />
          </label>

          <label for='registration-email' class='registration-form__label'>
            <span class='registration-form__label-text'>Email Address</span>
            <input
              id='registration-email' v-model='formData.email' type='email' name='email'
              class='registration-form__input' required />
          </label>

          <label for='registration-address-line-1' class='registration-form__label'>
            <span class='registration-form__label-text'>Address Line 1</span>
            <input
              id='registration-address-line-1' v-model='formData.address_line_1' type='text' name='address-line-1'
              class='registration-form__input'
              required />
          </label>

          <label for='registration-address-line-2' class='registration-form__label'>
            <span class='registration-form__label-text'>Address Line 2</span>
            <input
              id='registration-address-line-2' v-model='formData.address_line_2' type='text' name='address-line-2'
              class='registration-form__input' />
          </label>

          <label for='registration-city' class='registration-form__label registration-form__label--third'>
            <span class='registration-form__label-text'>City</span>
            <input
              id='registration-city' v-model='formData.city' type='text' name='city'
              class='registration-form__input' required />
          </label>

          <label for='registration-state' class='registration-form__label registration-form__label--third'>
            <span class='registration-form__label-text'>State</span>
            <input
              id='registration-state' v-model='formData.state' type='text' name='state'
              class='registration-form__input' required />
          </label>

          <label for='registration-zip' class='registration-form__label registration-form__label--third'>
            <span class='registration-form__label-text'>Zip</span>
            <input
              id='registration-zip' v-model='formData.zip' type='text' name='zip' class='registration-form__input'
              required />
          </label>

          <label for='registration-password' class='registration-form__label'>
            <span class='registration-form__label-text'>Password</span>
            <input
              id='registration-password' v-model='formData.password' type='password' name='password'
              class='registration-form__input' required>
          </label>

          <label for='registration-confirm-password' class='registration-form__label'>
            <span class='registration-form__label-text'>Confirm Password</span>
            <input
              id='registration-confirm-password' v-model='formData.password_confirm' type='password'
              name='confirm-password' class='registration-form__input' required>
          </label>
          <input type='submit' value='Create Account' class='registration-form__submit' @click='registerUser'>
        </fieldset>
      </form>
      <router-link to='/' class='app-navigation__link'>Back to Login</router-link>
    </div>
  </div>
</template>

<style lang='scss'>
.registration-page {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100vh;
  padding: 0 10px;

  &__inner {
    margin-top: auto;
    margin-bottom: auto;
  }
}

.registration-form {
  width: 500px;
  max-width: 100%;
  margin-bottom: 15px;
  margin-left: auto;
  margin-right: auto;

  &__fields {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 30px 35px;
    width: 100%;
  }

  &__label {
    text-align: left;
    width: 100%;
    height: 100%;
    margin-bottom: 1rem;

    &--half {
      width: 48%;
    }

    &--third {
      width: 31%;
    }
  }

  &__label-text {
    width: 100%;
    display: block;
    font-weight: 600;
    margin-bottom: 4px;
    cursor: pointer;
  }

  &__input {
    width: 100%;
    padding: 8px 10px;
  }

  &__submit {
    width: 300px;
    margin: 15px auto 10px;
  }

  &__temp-note {
    display: block;
    line-height: 1.1;
    margin-top: 5px;
    font-weight: 500;
    font-size: 0.85rem;

    em {
      color: darkred;
    }
  }
}
</style>
