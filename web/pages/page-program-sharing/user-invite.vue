<script setup>
import { reactive } from "vue";
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

const { hostess } = useGlobals();
const payload = reactive({ toEmail: null, programId: props.programId });
const invite = useTask(() => hostess.invite(payload));

const handleInvite = async () => {
  await invite.run();
  payload.toEmail = null;
};
</script>
<template>
  <div class="program-add">
    <input-base v-model="payload.toEmail" @submit="handleInvite" />
    <button-base @click="handleInvite" :busy="invite.busy">
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
