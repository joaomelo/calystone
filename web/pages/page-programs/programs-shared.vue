<script setup>
import {
  ButtonBase,
  ListBase,
  useGlobals,
  useGlobalStateful,
  useTask,
} from "../../../lib";

const acceptText = useGlobalStateful((i18n) => i18n.t("accept"));
const ignoreText = useGlobalStateful((i18n) => i18n.t("ignore"));

const invitedPrograms = useGlobalStateful((hostess) =>
  hostess.listInvitesToMe()
);

const { hostess } = useGlobals();
const acceptTask = useTask((id) => hostess.accept(id));
const ignoreTask = useTask((id) => hostess.ignore(id));
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
