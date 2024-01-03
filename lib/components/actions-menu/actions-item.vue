<script setup></script>

<template>
  <div class="action-item">
    <slot></slot>
  </div>
</template>

<style scoped>
.action-item {
  cursor: pointer;
  padding: var(--size-20);
}

.action-item:hover {
  background-color: var(--color-surface-30);
}
</style>
