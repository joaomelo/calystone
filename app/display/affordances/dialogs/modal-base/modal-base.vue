<script setup lang="ts">
import Dialog from "primevue/dialog";
import Message from "primevue/message";
import { ref } from "vue";

import { kebabCase } from "@/utils";

defineProps<{
  dataTest: string,
  error?: string,
  header: string,
}>();
defineExpose({
  close,
  open
});

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
    :data-test="dataTest"
    :header="header"
    modal
    :style="{ 'width': 'min(var(--size-sm), 90%)' }"
  >
    <template #default>
      <template v-if="error">
        <Message
          class="modal-base__error"
          :data-test="kebabCase(dataTest, 'error')"
          severity="error"
          size="small"
          variant="simple"
        >
          {{ error }}
        </Message>
      </template>
      <slot
        :close="close"
        name="content"
      />
    </template>
    <template #footer>
      <slot
        :close="close"
        name="buttons"
      />
    </template>
  </Dialog>
</template>
<style scoped>
.modal-base__error {
  margin-block-end: var(--size-1);
}
</style>