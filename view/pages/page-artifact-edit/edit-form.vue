<script setup>
import { useRouter } from "vue-router";
import { ButtonBase, FormBase, InputBase, useT } from "@lib";
import { useEditArtifact } from "@body";

const props = defineProps({
  artifactId: {
    type: String,
    required: true,
  },
});

const t = useT();

const { editArtifactTask, artifactData } = useEditArtifact(props.artifactId);

const router = useRouter();
const route = () => router.push({ name: "artifactsPlan" });

const handleSave = async () => {
  await editArtifactTask.run();
  route();
};
const handleCancel = route;
</script>
<template>
  <form-base @submit="handleSave" :busy="editArtifactTask.busy">
    <template #default>
      <input-base v-model="artifactData.name" :label="t('name')" />
      <input-base
        v-model="artifactData.notes"
        :label="t('notes')"
        type="textarea"
        rows="20"
      />
    </template>
    <template #buttons>
      <button-base @click="handleCancel">{{ t("cancel") }}</button-base>
      <button-base type="submit">{{ t("save") }}</button-base>
    </template>
  </form-base>
</template>
