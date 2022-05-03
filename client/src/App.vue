<script setup>
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
  <!-- This nav element might be abstracted to a different component later.
   When routing to established routes, use the router-link component with a
    to attribute. -->
  <nav>
    <router-link to='/' style='margin-right: 10px'>Login</router-link>
    <router-link to='/register'>Register</router-link>
  </nav>

  <!-- Router View is the component that renders routes based on what is
   configured within src/routes/index.js -->
  <router-view></router-view>

  <h2>The first author pulled from the database is {{state.author}}</h2>
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
