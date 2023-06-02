<script setup>
import { ref } from "vue";
import { InputBase } from "../input-base";
import { ButtonBase } from "../button-base";
import ItemDetail from "./item-detail.vue";

defineProps({
  items: {
    type: Array,
    default: () => [],
  },
});
const emit = defineEmits(["update", "detail", "cancel"]);

const open = ref(false);

const handleUpdate = (id, value) => {
  emit("update", { id, value });
};

const handleConfirm = (payload) => {
  emit("detail", payload);
  open.value = false;
};

const handleCancel = () => {
  emit("cancel");
  open.value = false;
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
      <button-base @click="open = true">...</button-base>
      <item-detail
        :id="item.id"
        :open="open"
        @confirm="handleConfirm"
        @cancel="handleCancel"
      />
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
</style>
