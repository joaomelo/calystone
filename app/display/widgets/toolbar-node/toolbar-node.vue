<script setup lang="ts">

import { ToolbarBase, ToolbarButton } from "@/utils";

defineProps<{
  remove: boolean
  rename: boolean;
  share: boolean;
}>();
defineEmits<{
  remove: [];
  rename: [];
  share: [];
}>();
</script>
<template>
  <ToolbarBase>
    <template #start>
      <ToolbarButton
        v-if="share"
        icon="bxs-share-alt"
        data-test="button-share"
        @click="$emit('share')"
      />
      <ToolbarButton
        v-if="rename"
        icon="bxs-rename"
        data-test="button-rename"
        @click="$emit('rename')"
      />
      <ToolbarButton
        v-if="remove"
        icon="bxs-trash"
        data-test="button-remove"
        @click="$emit('remove')"
      />
      <slot name="start" />
    </template>
    <template #end>
      <slot name="end" />
    </template>
  </ToolbarBase>
</template>