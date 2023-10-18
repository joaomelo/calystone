<script setup>
import { reactive } from "vue";
import { useT } from "@view/i18n";
import { ButtonBase, FormBase, InputBase } from "@view/components";

const props = defineProps({
  artifact: {
    type: Object,
    required: () => {},
  },
});
defineEmits(["save", "cancel"]);

const t = useT();
const payload = reactive({ ...props.artifact });
</script>
<template>
  <form-base @submit="$emit('save', payload)">
    <template #default>
      <input-base v-model="payload.name" :label="t('name')" />
      <input-base
        v-model="payload.notes"
        :label="t('notes')"
        type="textarea"
        rows="20"
      />
    </template>
    <template #buttons>
      <button-base @click="$emit('cancel')">{{ t("cancel") }}</button-base>
      <button-base type="submit">{{ t("save") }}</button-base>
    </template>
  </form-base>
</template>
