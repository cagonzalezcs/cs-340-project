<script setup>
const props = defineProps({
  heading: {
    type: String,
    required: true,
  },
  linkRoute: {
    type: String,
    required: true
  },
  linkText: {
    type: String,
    required: true
  }
});

</script>

<template>
  <section class='auth-layout'>
    <div class='auth-layout__inner'>
      <header class='auth-layout__header'>
        <h1 class='auth-layout__heading'> {{ props.heading }}</h1>
      </header>
      <form action='#' class='auth-layout__form' @submit.prevent>
        <fieldset class='auth-layout__form-fields'>
          <slot name='form-fields'></slot>
        </fieldset>
      </form>
      <router-link :to='linkRoute' class='auth-layout__link'>
        {{ linkText }}
      </router-link>
    </div>
  </section>
</template>

<style lang='scss'>
.auth-layout {
  @apply relative flex justify-center items-start content-start w-full h-screen bg-gradient-to-br from-cyan-300 to-blue-600 text-center overflow-hidden;

  &::before {
    @apply content-[''] fixed z-0;

    width: 400px;
    height: 350px;
    right: -2%;
    bottom: 5%;
    background-image: url('@/assets/images/icons/book-blue.svg');
    background-size: contain;
    background-position: bottom right;
    background-repeat: no-repeat;
    opacity: 0.25;
    transform: rotate(30deg);

    @screen sm {
      width: 500px;
      height: 450px;
    }

    @screen md {
      width: 600px;
      height: 550px;
      right: -5%;
    }

    @screen lg {
      width: 700px;
      height: 650px;
    }

    @media (min-width: 1920px) {
      width: 60%;
      height: 60%;
      right: -1.5%;
      bottom: 10%
    }
  }

  &__inner {
    @apply flex flex-col my-auto w-full h-full relative z-10 overflow-auto py-20;
  }

  &__header {
    @apply mt-auto;
  }

  &__heading {
    @apply font-bold text-white text-2xl leading-none mb-10 drop-shadow-md sm:text-4xl sm:mb-12 md:text-5xl;
  }

  &__link {
    @apply inline-block text-white font-bold text-base leading-tight mt-4 mb-auto drop-shadow-md sm:text-xl;
  }

  &__form {
    @apply w-[35rem] max-w-[90%] mx-auto mb-4 bg-neutral-50 rounded shadow-lg;

    &-fields {
      @apply flex flex-row flex-wrap w-full justify-between py-8 px-6 sm:py-10 sm:px-11;
    }

    &-label {
      @apply text-left w-full h-full mb-6;
    }

    &-label-text {
      @apply w-full block font-semibold mb-2 cursor-pointer text-sm sm:text-base;
    }

    &-submit {
      @apply mt-4 mb-2 mx-auto w-full max-w-[275px];
    }
  }
}
</style>
