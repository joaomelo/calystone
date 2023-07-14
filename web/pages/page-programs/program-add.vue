<script setup>
import { reactive } from "vue";
import { InputBase, ButtonBase, useGlobalStateful } from "../../../lib";

defineProps({
  busy: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["add"]);

const addText = useGlobalStateful((i18n) => i18n.t("add"));

const payload = reactive({ name: null });
const handleAdd = () => {
  emit("add", { ...payload });
  payload.name = null;
};
</script>
<template>
  <div class="program-add">
    <input-base v-model="payload.name" @submit="handleAdd" />
    <button-base @click="handleAdd" :busy="busy">{{ addText }}</button-base>
  </div>
</template>
<style scoped>
.program-add {
  display: flex;
  justify-content: space-between;
  gap: var(--size-00);
}
</style>
