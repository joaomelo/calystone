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

const users = useGlobalStateful((brother) => {
  const program = brother.findProgramWithId(props.programId);
  if (!program) return [];
  return program.users.map((user) => ({
    email: user.email,
  }));
});

const pendingInvites = useGlobalStateful((brother) => {
  const invites = brother.listPendingInvitesOfProgram(props.programId);
  return invites.map((invite) => ({
    email: invite.toUser.email,
    status: invite.status,
  }));
});

const items = computed(() => users.value.concat(pendingInvites.value));
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
