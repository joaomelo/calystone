<script setup>
import { alignTagsFor, listTagsOf } from "@body";
import { ButtonBase, FormBase, ModalBase, TextHeading, useDependencies, useI18n } from "@lib";
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
const { t } = useI18n();

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
  <modal-base
    v-model="show"
    class="modal-tags"
    :data-test="show ? 'modal-tags-show' : undefined"
  >
    <text-heading class="modal-tags-heading">
      {{ t('shared.tags') }}
    </text-heading>
    <form-base @submit="handleSave">
      <template #default>
        <input-tags v-model="tagsIds" />
      </template>
      <template #buttons>
        <button-base
          data-test="button-save"
          :label="t('shared.save')"
          type="submit"
          @click="handleSave"
        />
        <button-base
          data-test="button-cancel"
          :label="t('shared.cancel')"
          @click="show = false"
        />
      </template>
    </form-base>
  </modal-base>
</template>

<style scoped>
.modal-tags-heading {
  margin-bottom: var(--size-20);
}
</style>
