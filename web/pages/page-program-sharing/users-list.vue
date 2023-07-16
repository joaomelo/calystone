<script setup>
import { useGlobalStateful, ListBase } from "../../../lib";
const props = defineProps({
  programId: {
    type: String,
    required: true,
  },
});

const program = useGlobalStateful((strategist) =>
  strategist.get(props.programId)
);
const invites = useGlobalStateful((hostess) => {
  const invites = hostess.filterByProgram(props.programId);
  return invites.map((invite) => invite);
});
</script>
<template>
  <list-base :items="community">
    <template #content="{ item }">
      <p>{{ item.email }}</p>
    </template>
  </list-base>
</template>
