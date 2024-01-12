<script setup>
import { alignTagsFor, listTagsOf } from "@body";
import { ButtonBase, ModalBase, useDependencies } from "@lib";
import { onMounted, ref } from "vue";

import InputTags from "./input-tags.vue";

const show = defineModel({
  required: true,
  type: Boolean,
});
const props = defineProps({
  artifactId: {
    default: null,
    type: String,
  },
});

const dependencies = useDependencies();

const tagsIds = ref([]);
onMounted(() => {
  const tags = listTagsOf(dependencies, props.artifactId);
  tagsIds.value = tags.map(({ id }) => id);
});

const handleSave = () => {
  alignTagsFor(dependencies, {
    artifactId: props.artifactId,
    tagsIds: tagsIds.value,
  });
  show.value = false;
};
</script>

<template>
  <modal-base v-model="show">
    <template #default>
      <input-tags v-model="tagsIds" />
    </template>
    <template #buttons>
      <button-base
        label="cancel"
        @click="show = false"
      />
      <button-base
        label="save"
        @click="handleSave"
      />
    </template>
  </modal-base>
</template>
