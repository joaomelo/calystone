<script setup lang="ts">
import { kebabCase } from "@/utils/text";
import Dialog from "primevue/dialog";
import Message from "primevue/message";
import { ref } from "vue";

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
    modal
    :header="header"
    :style="{ 'width': 'min(var(--size-sm), 90%)' }"
    :data-test="dataTest"
  >
    <template #default>
      <template v-if="error">
        <Message
          severity="error"
          size="small"
          variant="simple"
          class="modal-base__error"
          :data-test="kebabCase(dataTest, 'error')"
        >
          {{ error }}
        </Message>
      </template>
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
<style scoped>
.modal-base__error {
  margin-block-end: var(--size-1);
}
</style>