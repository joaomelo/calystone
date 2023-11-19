<script setup>
// import { reactive } from "vue";
// import { ButtonBase, FormBase, InputBase, useI18n, useBody } from "@lib";

// const props = defineProps({
//   artifactId: {
//     type: String,
//     required: true,
//   },
// });
// defineEmits(["save", "cancel"]);

// const t = useI18n();
// const body = useBody();

// const payload = reactive({ id: props.artifactId });
</script>
<template>
  form edit
  <!-- <form-base @submit="$emit('save', payload)">
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
  </form-base> -->
</template>
