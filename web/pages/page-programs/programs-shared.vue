<script setup>
import { ListBase, useGlobalStateful } from "../../../lib";
import ProgramsSharedActions from "./programs-shared-actions.vue";

const pendingText = useGlobalStateful((i18n) => i18n.t("pending"));

const invites = useGlobalStateful((brother) =>
  brother.listInvitesToCurrentUser()
);
</script>
<template>
  <list-base :items="invites">
    <template #content="{ item }">
      <p class="invited-program">
        {{ item.program?.name }}
        <span>({{ pendingText }})</span>
      </p>
    </template>
    <template #aside="{ item }">
      <programs-shared-actions :invite="item" />
    </template>
  </list-base>
</template>

<style scoped>
.invited-program {
  color: var(--color-neutral-40);
}
</style>
