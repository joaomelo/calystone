<script setup lang="ts">
import Dialog from "primevue/dialog";
import { ref } from "vue";

defineProps<{
  header: string
}>();
defineExpose({ close, open });

const visible = ref(false);

function close() {
  visible.value = false;
}

function open() {
  visible.value = true;
}
</script>
<template>
  <Dialog
    v-model:visible="visible"
    modal
    :header="header"
    :style="{ 'width': 'min(var(--size-sm), 90%)' }"
  >
    <template #default>
      <slot
        name="content"
        :close="close"
      />
    </template>
    <template #footer>
      <slot
        name="buttons"
        :close="close"
      />
    </template>
  </Dialog>
</template>