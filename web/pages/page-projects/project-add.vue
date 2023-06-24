<script setup>
import { reactive } from "vue";
import { InputBase, ButtonBase } from "../../../components";

defineProps({
  busy: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["add"]);

const payload = reactive({ name: null });
const handleAdd = () => {
  emit("add", { ...payload });
  payload.name = null;
};
</script>
<template>
  <div class="project-add">
    <input-base v-model="payload.name" @submit="handleAdd" />
    <button-base @click="handleAdd" :busy="busy">add</button-base>
  </div>
</template>
<style scoped>
.project-add {
  display: flex;
  gap: var(--size-00);
}
</style>
