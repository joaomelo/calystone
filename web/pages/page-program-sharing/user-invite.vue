<script setup>
import { ref, reactive } from "vue";
import {
  InputBase,
  ButtonBase,
  useGlobals,
  useGlobalStateful,
  useTask,
} from "../../../lib";

const props = defineProps({
  programId: {
    type: String,
    required: true,
  },
});

const inviteText = useGlobalStateful((i18n) => i18n.t("invite"));

const { invites, users } = useGlobals();
const email = ref(null);
const payload = reactive({ toUserId: null, programId: props.programId });
const inviteTask = useTask(() => {
  const user = users.findUserWithEmail(email.value);
  if (!user) throw Error("COULD_NOT_FIND_USER_WITH_EMAIL");
  payload.toUserId = user.id;
  invites.invite(payload);
});

const handleInvite = async () => {
  await inviteTask.run();
  payload.toEmail = null;
};
</script>
<template>
  <div class="program-add">
    <input-base v-model="email" @submit="handleInvite" />
    <button-base @click="handleInvite" :busy="inviteTask.busy">
      {{ inviteText }}
    </button-base>
  </div>
</template>
<style scoped>
.program-add {
  display: flex;
  justify-content: space-between;
  gap: var(--size-00);
}
</style>
