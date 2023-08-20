<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import {
  ButtonBase,
  FormBase,
  InputBase,
  useGlobalStateful,
  useTask,
} from "../../../lib";
import { routesPaths } from "../../router";

const props = defineProps({
  programId: {
    type: String,
    required: true,
  },
});

const nameText = useGlobalStateful((i18n) => i18n.t("name"));
const notesText = useGlobalStateful((i18n) => i18n.t("notes"));
const cancelText = useGlobalStateful((i18n) => i18n.t("cancel"));
const saveText = useGlobalStateful((i18n) => i18n.t("save"));

const program = useGlobalStateful((programs) =>
  programs.findProgramWithId(props.programId)
);
const payload = reactive({
  name: program.value?.name,
  notes: program.value?.notes,
});
const edit = useTask(() => program.edit(payload));

const router = useRouter();
const handleSave = async (payload) => {
  await edit.run(payload);
  router.push(routesPaths.programs);
};
const handleCancel = () => router.push(routesPaths.programs);
</script>
<template>
  <form-base @submit="handleSave" :busy="edit.busy">
    <template #default>
      <input-base v-model="payload.name" :label="nameText" />
      <input-base
        v-model="payload.notes"
        :label="notesText"
        type="textarea"
        rows="20"
      />
    </template>
    <template #buttons>
      <button-base @click="handleCancel">{{ cancelText }}</button-base>
      <button-base type="submit">{{ saveText }}</button-base>
    </template>
  </form-base>
</template>
