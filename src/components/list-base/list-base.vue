<script setup>
import { ButtonBase } from "../button-base";

defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  actions: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["action"]);
const handleAction = (id, action) => {
  emit("action", { id, action });
};
</script>
<template>
  <div>
    <div v-for="item in items" :key="item.id" class="list-base-item">
      <div class="list-base-name">{{ item.name }}</div>
      <div class="list-base-actions">
        <button-base
          v-for="action in actions"
          @click="() => handleAction(item.id, action)"
          :key="action"
        >
          {{ action }}
        </button-base>
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

.list-base-name {
  flex-grow: 1;
}

.list-base-actions {
  display: flex;
  gap: var(--size-00);
}
</style>
