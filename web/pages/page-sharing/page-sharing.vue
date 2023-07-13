<script setup>
import { useGlobalStateful } from "../../../lib";
import { PageDashboard } from "../page-base";
import SharingTitle from "./sharing-title.vue";
import UsersList from "./users-list.vue";
import UserInvite from "./user-invite.vue";

const props = defineProps({
  projectId: {
    type: String,
    required: true,
  },
});

const usersList = useGlobalStateful((projects) =>
  projects.usersOf(props.projectId)
);
</script>
<template>
  <page-dashboard>
    <template #title>
      <sharing-title :project-id="projectId" />
    </template>
    <template #default>
      <users-list :items="usersList" />
    </template>
  </page-dashboard>
</template>
