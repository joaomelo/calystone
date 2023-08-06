<script setup>
import { ButtonBase, ListBase, useGlobalStateful } from "../../../lib";

const invitedPrograms = useGlobalStateful((hostess) =>
  hostess.listInvitesToCurrentUser()
);
</script>
<template>
  <list-base :items="invitedPrograms">
    <template #content="{ item }">
      <p class="invited-program">{{ item.program?.name }}</p>
    </template>
    <template #aside="{ item }">
      <button-base @click="acceptTask.run(item.id)">
        {{ acceptText }}
      </button-base>
      <button-base @click="ignoreTask.run(item.id)">
        {{ ignoreText }}
      </button-base>
    </template>
  </list-base>
</template>

<style scoped>
.invited-program {
  color: var(--color-neutral-40);
}
</style>
