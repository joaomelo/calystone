<script setup>
import { reactive, watch } from "vue";
import { useRouter } from "vue-router";
import {
  ButtonBase,
  FormBase,
  InputBase,
  useGlobals,
  useGlobalStateful,
  useTask,
} from "../../../lib";

const props = defineProps({
  artifactId: {
    type: String,
    required: true,
  },
});

const nameText = useGlobalStateful((i18n) => i18n.t("name"));
const notesText = useGlobalStateful((i18n) => i18n.t("notes"));
const cancelText = useGlobalStateful((i18n) => i18n.t("cancel"));
const saveText = useGlobalStateful((i18n) => i18n.t("save"));

const artifact = useGlobalStateful((artifacts) =>
  artifacts.findArtifactWithId(props.artifactId)
);

const artifactData = reactive({
  id: props.artifactId,
  name: null,
  notes: null,
});
watch(artifact, (newArtifact) => {
  artifactData.name = newArtifact?.name || null;
  artifactData.notes = newArtifact?.notes || null;
});

const { artifacts } = useGlobals();
const editTask = useTask(() => artifacts.edit(artifactData));

const router = useRouter();
const route = () =>
  router.push({
    name: "programPlan",
    params: { programId: artifact.value?.program.id },
  });

const handleSave = async () => {
  await editTask.run(artifactData);
  route();
};
const handleCancel = route;
</script>
<template>
  <form-base @submit="handleSave" :busy="editTask.busy">
    <template #default>
      <input-base v-model="artifactData.name" :label="nameText" />
      <input-base
        v-model="artifactData.notes"
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
