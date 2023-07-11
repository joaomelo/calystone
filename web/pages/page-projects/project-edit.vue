<script setup>
import { computed, ref, watch } from "vue";
import {
  ModalBase,
  ButtonBase,
  InputBase,
  useGlobalStateful,
} from "../../../lib";
const props = defineProps({
  item: {
    type: Object,
    default: null,
  },
});
defineEmits(["save", "cancel"]);

const saveText = useGlobalStateful((i18n) => i18n.t("save"));
const cancelText = useGlobalStateful((i18n) => i18n.t("cancel"));

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
