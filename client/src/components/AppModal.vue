<script setup>
const props = defineProps({
  'isModalActive': Boolean,
});
const emit = defineEmits(['toggleActiveStatus']);

function clickOutsideModalContent() {
  emit('toggleActiveStatus');
}
</script>

<template>
  <transition>
    <div
      v-if='props.isModalActive'
      class='app-modal' :class='{
        "app-modal--active": props.isModalActive
      }'>
      <div v-click-outside='clickOutsideModalContent' class='app-modal__content'>
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>

<style lang='scss'>
.app-modal {
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.70);
  padding-top: 40px;
  padding-bottom: 40px;
  pointer-events: none;

  &::before {
    content: '\2715';
    position: absolute;
    top: 7px;
    right: 15px;
    font-size: 38px;
    color: #fff;
    opacity: 0.9;
  }

  &--active {
    pointer-events: auto;
    cursor: pointer;
  }

  &__content {
    @apply bg-neutral-50;

    width: auto;
    max-width: 95%;
    margin-top: auto;
    margin-bottom: auto;
    padding: 30px 50px;
    border-radius: 5px;
    cursor: auto;
  }
}
</style>
