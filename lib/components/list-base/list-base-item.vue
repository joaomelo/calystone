<script setup>
defineProps({
  item: {
    type: Object,
    required: true,
  },
});
</script>
<template>
  <div class="list-base-item">
    <div class="list-base-content">
      <slot name="content" :item="item"></slot>
    </div>
    <div class="list-base-aside">
      <slot name="aside" :item="item"></slot>
    </div>
  </div>
</template>
<style scoped>
.list-base-item {
  padding-block: var(--size-10);
  display: flex;
}

.list-base-item:hover {
  background-color: var(--color-neutral-60);
}

.list-base-item:focus-within {
  background-color: var(--color-neutral-50);
}

.list-base-content {
  flex-grow: 1;
}

.list-base-aside {
  display: flex;
  gap: var(--size-00);
}
</style>
