<script setup></script>
<template>
  <button class="button-veil">
    <slot />
  </button>
</template>
<style scoped>
.button-veil {
  border: none;
  padding: 0;

  /* only way to make the button the same size of the visual-icon put inside it was to display it as flex */
  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
  background-color: transparent;
}

.button-veil:hover {
  color: var(--color-content-60);
}
</style>
