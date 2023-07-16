<script setup>
import { reactive } from "vue";
import {
  ButtonBase,
  InputBase,
  useGlobals,
  useGlobalStateful,
  useTask,
} from "../../../lib";

const addText = useGlobalStateful((i18n) => i18n.t("add"));

const { strategist } = useGlobals();
const payload = reactive({ name: null });

const add = useTask(() => strategist.program(payload));
const handleAdd = async () => {
  await add.run(payload);
  payload.name = null;
};
</script>
<template>
  <div class="program-add">
    <input-base v-model="payload.name" @submit="handleAdd" />
    <button-base @click="handleAdd" :busy="add.busy">{{ addText }}</button-base>
  </div>
</template>
<style scoped>
.program-add {
  display: flex;
  justify-content: space-between;
  gap: var(--size-00);
}
</style>
