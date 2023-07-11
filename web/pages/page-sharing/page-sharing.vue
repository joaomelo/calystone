<script setup>
import { ref } from "vue";
import { useTask, useGlobals, useGlobalStateful } from "../../../lib";
import { PageDashboard } from "../page-base";

const props = defineProps({
  projectId: {
    type: String,
    required: true,
  },
});

const project = useGlobalStateful((projects) => projects.get(props.projectId));

const pageTitle = useGlobalStateful((i18n) =>
  i18n.t("sharingOf", { name: project?.value?.name })
);

// const delay = { delay: 0.5 };
// const add = useTask((payload) => projects.add(payload), delay);
// const archive = useTask((id) => projects.archive(id), delay);
// const del = useTask((id) => projects.del(id), delay);
// const edit = useTask((payload) => projects.edit(payload), delay);

// const item = ref(null);
// const handleOpen = (id) => (item.value = projects.get(id));
// const handleSave = async (payload) => {
//   await edit.run(payload);
//   item.value = null;
// };
// const handleCancel = () => {
//   item.value = null;
// };

// const shared = ref(null);
// const community = [];
// const handleSharing = (id) => (shared.value = id);
// const handleCancelSharing = () => {
//   shared.value = null;
// };

{
  /* <project-sharing
      :community="community"
      :shared="shared"
      @save="handleSaveSharing"
      @cancel="handleCancelSharing"
    /> */
}
</script>
<template>
  <page-dashboard :title="pageTitle"> {{ projectId }} </page-dashboard>
</template>
