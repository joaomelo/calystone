<script setup></script>
<template>
  <section><slot /></section>
</template>
<style scoped>
section {
  display: flex;
  flex-direction: column;
  gap: var(--size-15);
}
</style>
