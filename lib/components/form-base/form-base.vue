<script setup></script>
<template>
  <form>
    <div>
      <slot />
    </div>
    <div class="model-base-buttons">
      <slot name="buttons" :close="close" />
    </div>
  </form>
</template>

<style scoped>
.model-base-buttons {
  margin-top: var(--size-20);
  display: flex;
  justify-content: end;
  gap: var(--size-10);
}
</style>
