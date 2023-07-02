<script setup>
import { inject, reactive } from "vue";
import { InputBase, ButtonBase, useStateful } from "../../../lib";

defineProps({
  busy: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["add"]);

const { i18n } = inject("globals");
const addText = useStateful(i18n, (i) => i.t("add"));

const payload = reactive({ name: null });
const handleAdd = () => {
  emit("add", { ...payload });
  payload.name = null;
};
</script>
<template>
  <div class="project-add">
    <input-base v-model="payload.name" @submit="handleAdd" />
    <button-base @click="handleAdd" :busy="busy">{{ addText }}</button-base>
  </div>
</template>
<style scoped>
.project-add {
  display: flex;
  justify-content: space-between;
  gap: var(--size-00);
}
</style>
