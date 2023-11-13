<script setup></script>
<template>
  <div class="buttons-panel">
    <slot></slot>
  </div>
</template>
<style scoped>
.buttons-panel {
  display: flex;
  flex-direction: column;
  gap: var(--size-10);
}

@media (min-width: 512px) {
  .buttons-panel {
    flex-direction: row-reverse;
    justify-content: end;
    align-items: center;
  }
}
</style>
