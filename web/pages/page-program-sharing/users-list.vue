<script setup>
import { computed } from "vue";
import { useGlobalStateful, ListBase } from "../../../lib";
const props = defineProps({
  programId: {
    type: String,
    required: true,
  },
});

const pendingText = useGlobalStateful((i18n) => i18n.t("pending"));

const relatedUsers = useGlobalStateful((programs) => {
  const program = programs.findProgramWithId(props.programId);
  if (!program) return [];
  return program.users.map(({ email }) => ({ email }));
});

const pendingInvites = useGlobalStateful((invites) => {
  const pendingInvites = invites.listPendingInvitesOfProgram(props.programId);
  return pendingInvites.map((invite) => ({
    email: invite.toUser.email,
    status: invite.status,
  }));
});

const items = computed(() => relatedUsers.value.concat(pendingInvites.value));
</script>
<template>
  <list-base :items="items">
    <template #content="{ item }">
      <p :class="{ pending: item.status }">
        {{ item.email }}
        <span v-if="item.status">({{ pendingText }})</span>
      </p>
    </template>
  </list-base>
</template>
<style scoped>
.pending {
  color: var(--color-neutral-40);
}
</style>
