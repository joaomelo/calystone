<script setup>
import { computed, reactive, watch } from "vue";
import { ModalBase, ButtonBase, InputBase } from "../../components";
const props = defineProps({
  item: {
    type: Object,
    default: null,
  },
});
defineEmits(["save", "cancel"]);

const show = computed(() => !!props.item);
const payload = reactive({ id: props.item?.id, name: props.item?.name });
watch(
  () => props.item,
  (value) => {
    payload.id = value?.id;
    payload.name = value?.name;
  }
);
</script>
<template>
  <modal-base :show="show">
    <template #default>
      <input-base v-model="payload.name"></input-base>
    </template>
    <template #buttons>
      <button-base @click="$emit('cancel')">cancelar</button-base>
      <button-base @click="$emit('save', payload)">salvar</button-base>
    </template>
  </modal-base>
</template>
