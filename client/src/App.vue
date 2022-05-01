<script setup>
import HelloWorld from './components/HelloWorld.vue';
import { reactive, onMounted } from 'vue';

const state = reactive({
  author: null
});

onMounted(async () => {
  try {
    const response = await fetch(import.meta.env.SERVER_URI, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    if (!data.length) {
      return;
    }

    setFirstAuthor(data[0].name);
  } catch(error) {
    console.error(error);
  }
});

function setFirstAuthor(author) {
  state.author = author;
}
</script>
 
<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <div class="placeholder-message">
    First Author in the DB is: {{ state.author }}
  </div>
  <HelloWorld msg="Hello Vue 3 + Vite" />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
