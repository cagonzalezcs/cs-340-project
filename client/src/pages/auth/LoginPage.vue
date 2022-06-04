<script setup>
import { onMounted, reactive } from 'vue';
import router from '../../router';
import { checkUserIsLoggedOut } from '../../router/middleware.js';
import { useUserStore } from '../../stores/user';

onMounted(async () => {
  await checkUserIsLoggedOut();
});

const user = useUserStore();

const form = reactive({
  email: '',
  password: '',
});

async function onSubmit() {
  if (!form.email || !form.password) {
    alert('Username and password required to log in.');
    return;
  }

  const userLoginData = {
    email: form.email,
    password: form.password,
  };
  const isLoginSuccessful = await user.login(userLoginData);
  form.email = '';
  form.password = '';

  if (!isLoginSuccessful) {
    alert('A user with those credentials was not found.');
    return;
  }

  if (user.isAdmin) {
    await router.push({ path: '/admin/users' });
    return;
  }

  await router.push({ path: '/rental-list' });
}
</script>

<template>
  <div class='login-page'>
    <div class='login-page__inner'>
      <h1 class='login-page__title'>
        Welcome to Novel Pursuits!
      </h1>

      <form action='#' class='login-form' @submit.prevent>
        <fieldset class='login-form__fields'>
          <label for='login-email' class='login-form__label'>
            <span class='login-form__label-text'>Email Address*</span>
            <input id='login-email' v-model='form.email' type='email' name='email' class='login-form__input' required />
            <small class='login-form__temp-note'>admin user: admin@admin.com <br> admin password: adminpassword <br><br> customer user: customer@customer.com <br> customer password: customerpassword</small>
          </label>

          <label for='login-password' class='login-form__label'>
            <span class='login-form__label-text'>Password*</span>
            <input
id='login-password' v-model='form.password' type='password' name='password'
                   class='login-form__input'>
          </label>
          <input type='submit' value='Login' class='login-form__submit' required @click='onSubmit'>
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
