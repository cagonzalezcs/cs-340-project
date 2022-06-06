import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import vClickOutside from 'click-outside-vue3';
import Toast, { POSITION } from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import './styles/global.scss';

createApp(App)
  .use(createPinia())
  .use(router)
  .use(vClickOutside)
  .use(Toast, {
    transition: 'Vue-Toastification__fade',
    position: POSITION.TOP_CENTER,
    hideProgressBar: true,
    timeout: 6000,
    filterBeforeCreate: (toast, toasts) => {
      if (toasts.filter((t) => t.type === toast.type).length !== 0) {
        return false;
      }
      return toast;
    },
  })
  .mount('#app');
