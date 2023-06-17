<script setup>
defineProps({
  items: {
    type: Array,
    default: () => [],
  },
});
</script>
<template>
  <div>
    <div v-for="item in items" :key="item.id" class="list-base-item">
      <div class="list-base-content">
        <slot name="content" :item="item"></slot>
      </div>
      <div class="list-base-aside">
        <slot name="aside" :item="item"></slot>
      </div>
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
