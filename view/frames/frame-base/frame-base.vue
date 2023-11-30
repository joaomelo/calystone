<script setup></script>
<template>
  <div class="frame-base">
    <slot></slot>
  </div>
</template>
<style scoped>
.frame-base {
  flex-grow: 1;

  max-width: var(--size-85);
  min-height: 100vh;
  margin: auto;

  padding-block: var(--size-25);
  padding-inline: var(--size-30);

  background-color: var(--color-neutral-70);

  display: flex;
  flex-direction: column;
}
</style>
