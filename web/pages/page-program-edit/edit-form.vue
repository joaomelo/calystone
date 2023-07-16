<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useTask, useGlobals } from "../../../lib";
import { routesPaths } from "../../router";

const props = defineProps({
  programId: {
    type: String,
    required: true,
  },
});

const { strategist } = useGlobals();
const payload = reactive({ id: props.programId, name: null });
const edit = useTask(() => strategist.edit(payload));

const router = useRouter();
const handleSave = async (payload) => {
  await edit.run(payload);
  router.push(routesPaths.programs);
};
const handleCancel = () => router.push(routesPaths.programs);
</script>
<template>
  <form-base>
    <template #default>
      <input-base v-model="payload.name"></input-base>
    </template>
    <template #buttons>
      <button-base @click="handleCancel">{{ cancelText }}</button-base>
      <button-base @click="handleSave">{{ saveText }}</button-base>
    </template>
  </form-base>
</template>
