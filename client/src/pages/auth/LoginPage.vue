<script setup>
import router from '../../router';
import { useUserStore } from '../../stores/user';

const user = useUserStore();



async function onSubmit(formData) {
  if (!formData.target.elements.email.value) {
    return;
  }

  user.login(formData.target.elements.email.value);

  if (user.isAdmin) {
    await router.push({ path: '/admin/users'});
    return;
  }

  await router.push({ path: '/rental-list'});
}
</script>

<template>
  <div class='login-page'>
    <div class='login-page__inner'>
      <h1 class='login-page__title'>
        Welcome to Novel Pursuits!
      </h1>

      <form action='#' class='login-form' @submit.prevent='onSubmit'>
        <fieldset class='login-form__fields'>
          <label for='login-email' class='login-form__label'>
            <span class='login-form__label-text'>Email Address**</span>
            <input id='login-email' type='email' name='email' class='login-form__input' value='admin@admin.com' />
            <small class='login-form__temp-note'>**Note: In this mockup, use the email <em>"admin@admin.com"</em> to access the admin route. Use any other name to access the customer route.</small>
          </label>

          <label for='login-password' class='login-form__label'>
            <span class='login-form__label-text'>Password**</span>
            <input id='login-password' type='password' name='password' class='login-form__input'>
            <small class='login-form__temp-note'>**Note: For now this can be any value, auth validation has yet to be implemented.</small>
          </label>
          <input type='submit' value='Login' class='login-form__submit'>
          <router-link to='/forgot-password' class='app-navigation__link'>I forgot my password.</router-link>
        </fieldset>
      </form>
      <router-link to='/register' class='app-navigation__link'>Need an account? Create one now!</router-link>
    </div>
  </div>
</template>

<style lang='scss'>
.login-page {
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

.login-form {
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
    margin-top: 15px;
    margin-bottom: 20px;
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
