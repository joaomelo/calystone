<script setup>
import {
  ActionsMenu,
  useGlobals,
  useGlobalStateful,
  useTask,
} from "../../../lib";

const props = defineProps({
  invite: {
    type: Object,
    default: null,
  },
});

const { invites } = useGlobals();

const acceptText = useGlobalStateful((i18n) => i18n.t("accept"));
const acceptAction = { name: "accept", label: acceptText.value };
const acceptTask = useTask(() =>
  invites.findInviteWithId(props.invite.id).accept()
);

const ignoreText = useGlobalStateful((i18n) => i18n.t("ignore"));
const ignoreAction = { name: "ignore", label: ignoreText.value };
const ignoreTask = useTask(() =>
  invites.findInviteWithId(props.invite.id).ignore()
);

const handleAction = (action) => {
  switch (action) {
    case "accept":
      return acceptTask.run();
    case "ignore":
      return ignoreTask.run();
  }
};
</script>
<template>
  <actions-menu
    :actions="[acceptAction, ignoreAction]"
    @action="handleAction"
  />
</template>
