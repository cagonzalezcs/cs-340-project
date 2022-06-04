<script setup></script>

<template>
  <div class='not-found'>
    <h1 class='not-found__header'>404 Page Not Found</h1>
    <a href='/' class='not-found__link'>Return Home</a>
  </div>
</template>

<style lang='scss' scoped>
.not-found {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-content: center;

  &__header {
    @apply text-5xl mb-12;
  }

  &__link {
    @apply rounded bg-slate-100 text-lg border border-slate-200 shadow cursor-pointer;

    padding: 12px 25px;
    color: #222;
    transition: background-color 0.32s ease, color 0.25s ease, border-color 0.32s ease;

    &:hover {
      color: #fff;
      background-color: #222;
      border-color: #222;
    }
  }
}
</style>
