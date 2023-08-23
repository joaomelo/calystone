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

const { programs } = useGlobals();
const payload = reactive({ name: null });

const addTask = useTask(async () => {
  await programs.program(payload);
  payload.name = null;
});
</script>
<template>
  <div class="program-add">
    <input-base v-model="payload.name" @submit="addTask.run" />
    <button-base @click="addTask.run" :busy="addTask.busy">
      {{ addText }}
    </button-base>
  </div>
</template>
<style scoped>
.program-add {
  display: flex;
  justify-content: space-between;
  gap: var(--size-00);
}
</style>
