<script setup>
import { onMounted, reactive } from 'vue';
import router from '../../router';
import { checkUserIsLoggedOut } from '../../router/middleware.js';
import { useUserStore } from '../../stores/user';
import AuthLayout from '../../components/layouts/AuthLayout.vue';
import { useToast } from 'vue-toastification';

onMounted(async () => {
  await checkUserIsLoggedOut();
});

const user = useUserStore();
const toast = useToast();

const form = reactive({
  email: '',
  password: '',
});

async function onSubmit() {
  if (!form.email || !form.password) {
    toast.info('Email and password required to log in.');
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
    toast.error('A user with those credentials was not found.');
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
  <auth-layout heading='Welcome to Novel Pursuits!' link-route='/register' link-text='Need an account? Create one now!'>
    <template #form-fields>
        <label for='login-email' class='login-form__label auth-layout__form-label'>
          <span class='login-form__label-text auth-layout__form-label-text'>Email Address*</span>
          <input id='login-email' v-model='form.email' type='email' name='email' class='login-form__input auth-layout__form-input' required />
        </label>
      <small class='login-form__temp-note'>admin user: admin@admin.com <br> admin password: adminpassword <br><br> customer user: customer@customer.com <br> customer password: customerpassword</small>

        <label for='login-password' class='login-form__label auth-layout__form-label'>
          <span class='login-form__label-text auth-layout__form-label-text'>Password*</span>
          <input
            id='login-password' v-model='form.password' type='password' name='password'
            class='login-form__input auth-layout__form-input'>
        </label>
        <input type='submit' value='Login' class='login-form__submit auth-layout__form-submit' required @click='onSubmit'>
    </template>
  </auth-layout>
</template>

<style lang='scss'>
.login-form {
  &__temp-note {
    @apply block leading-tight mb-5 text-xs text-left font-normal sm:text-sm;
  }
}
</style>
