<script setup>
import { computed, ref, watch, inject } from "vue";
import { ModalBase, ButtonBase, InputBase, useStateful } from "../../../lib";
const props = defineProps({
  item: {
    type: Object,
    default: null,
  },
});
defineEmits(["save", "cancel"]);

const { i18n } = inject("globals");
const saveText = useStateful(i18n, (i) => i.t("save"));
const cancelText = useStateful(i18n, (i) => i.t("cancel"));

const show = computed(() => !!props.item);
const payload = ref({ id: props.item?.id, name: props.item?.name });
watch(
  () => props.item,
  (value) => {
    payload.value = {
      id: value?.id,
      name: value?.name,
    };
  }
);
</script>
<template>
  <modal-base :show="show">
    <template #default>
      <input-base v-model="payload.name"></input-base>
    </template>
    <template #buttons>
      <button-base @click="$emit('cancel')">{{ cancelText }}</button-base>
      <button-base @click="$emit('save', payload)">{{ saveText }}</button-base>
    </template>
  </modal-base>
</template>
