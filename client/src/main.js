import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import vClickOutside from 'click-outside-vue3';

createApp(App).use(createPinia()).use(router).use(vClickOutside).mount('#app');
