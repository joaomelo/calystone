<script setup>
const options = [
  { label: "delete", fn: () => console.log("delete") },
  { label: "archive", fn: () => console.log("archive") },
  { label: "open", fn: () => console.log("open") },
];
</script>
<template>
  <div class="item-actions">
    <div class="item-actions-open">...</div>
    <div class="item-actions-menu">
      <div
        class="item-actions-option"
        v-for="option in options"
        :key="option.label"
        @click="option.fn"
      >
        {{ option.label }}
      </div>
    </div>
  </div>
</template>
<style scoped>
.item-actions {
  cursor: pointer;
  position: relative;
  z-index: 1;
}

.item-actions-menu {
  display: none;
  position: absolute;
  right: var(--size-10);
  top: var(--size-30);
  background-color: var(--color-neutral-70);
  border: 1px solid var(--color-neutral-10);
}

.item-actions:hover .item-actions-menu {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.item-actions-option {
  padding: var(--size-10);
}

.item-actions-option:hover {
  background-color: var(--color-neutral-60);
}
</style>
