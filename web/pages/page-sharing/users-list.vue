<script setup>
import { useGlobalStateful, ListBase } from "../../../lib";
const props = defineProps({
  programId: {
    type: String,
    required: true,
  },
});

const items = useGlobalStateful((programs) =>
  programs.usersOf(props.programId)
);
</script>
<template>
  <list-base :items="items">
    <template #content="{ item }">
      <p>{{ item.title }}</p>
    </template>
  </list-base>
</template>
