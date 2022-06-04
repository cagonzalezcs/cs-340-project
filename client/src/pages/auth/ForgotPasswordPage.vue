<script setup>
import { onMounted } from 'vue';
import { checkUserIsLoggedOut } from '../../router/middleware.js';

onMounted(async () => {
  await checkUserIsLoggedOut();
});
</script>

<template>
  <div class='forgot-password-page'>
    <div class='forgot-password-page__inner'>
      <h1 class='forgot-password-page__title'>
        Forgot Your Password?
      </h1>

      <form action='#' class='forgot-password-form' @submit.prevent='onSubmit'>
        <fieldset class='forgot-password-form__fields'>
          <label for='forgot-password-email' class='forgot-password-form__label'>
            <span class='forgot-password-form__label-text'>Email Address**</span>
            <input id='forgot-password-email' type='text' name='email' class='forgot-password-form__input' />
            <small class='forgot-password-form__temp-note'>**Note: This currently does nothing. If we were running requests through a email server, it would send a password reset link to the user that would allow the user to reset the password. This is out of the scope of hte p </small>
          </label>

          <input type='submit' value='Send Reset Password Link' class='forgot-password-form__submit'>
        </fieldset>
      </form>
      <router-link to='/' class='app-navigation__link'>Back to Login</router-link>
    </div>
  </div>
</template>

<style lang='scss'>
.forgot-password-page {
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

.forgot-password-form {
  width: 400px;
  max-width: 100%;
  margin-bottom: 15px;

  &__fields {
    display: flex;
    flex-direction: column;
    padding: 30px 35px;
    width: 100%;
  }

  &__label {
    text-align: left;
    width: 100%;
    height: 100%;
    margin-bottom: 1rem;
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
    margin: 20px auto 10px;
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
