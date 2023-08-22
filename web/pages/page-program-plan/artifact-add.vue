<script setup>
import { reactive } from "vue";
import {
  InputBase,
  ButtonBase,
  useGlobals,
  useGlobalStateful,
  useTask,
} from "../../../lib";

const props = defineProps({
  programId: {
    type: String,
    required: true,
  },
});

const addText = useGlobalStateful((i18n) => i18n.t("add"));

const { artifacts } = useGlobals();
const payload = reactive({ name: null, programId: props.programId });
const addTask = useTask(async () => {
  await artifacts.artifact(payload);
  payload.name = null;
});
</script>
<template>
  <div class="artifact-add">
    <input-base v-model="payload.name" @submit="addTask.run" />
    <button-base @click="addTask.run" :busy="addTask.busy">
      {{ addText }}
    </button-base>
  </div>
</template>
<style scoped>
.artifact-add {
  display: flex;
  justify-content: space-between;
  gap: var(--size-00);
}
</style>
