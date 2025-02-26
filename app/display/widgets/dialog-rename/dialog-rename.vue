<script setup lang="ts">
import type { Node } from "@/domain";

import { ButtonBase } from "@/display/widgets/button-base";
import Dialog from "primevue/dialog";
import { ref } from "vue";

defineProps<{
  node: Node | undefined
}>();
defineExpose({ show });

const visible = ref(false);

function show() {
  visible.value = true;
}
</script>
<template>
  <Dialog
    v-model:visible="visible"
    modal
    header="Rename"
  >
    <template #default>
      rename {{ node?.name }}
    </template>
    <template #footer>
      <ButtonBase
        label="Cancel"
        text
        severity="secondary"
        autofocus
        @click="visible = false"
      />
      <ButtonBase
        label="Save"
        outlined
        severity="secondary"
        autofocus
        @click="visible = false"
      />
    </template>
  </Dialog>
</template>