<script setup>
import { InputBase } from "../input-base";

defineProps({
  items: {
    type: Array,
    default: () => [],
  },
});
const emit = defineEmits(["update"]);

const handleUpdate = (id, value) => {
  emit("update", { id, value });
};
</script>
<template>
  <div>
    <div v-for="item in items" :key="item.id" class="list-base-item">
      <input-base
        :modelValue="item.name"
        @update:modelValue="handleUpdate(item.id, $event)"
        transparent
      />
    </div>
  </div>
</template>

<style scoped>
.list-base-item {
  padding-block: var(--size-10);
}

.list-base-item:hover {
  background-color: var(--color-60);
}

.list-base-item:focus-within {
  background-color: var(--color-50);
}
</style>
