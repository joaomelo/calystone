<script setup>
import { PageDashboard } from "../page-base";
import SharingTitle from "./sharing-title.vue";
import UsersList from "./users-list.vue";
import UserInvite from "./user-invite.vue";

defineProps({
  programId: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <page-dashboard>
    <template #title>
      <sharing-title :program-id="programId" />
    </template>
    <template #default>
      <!-- <user-invite :program-id="programId" />
      <users-list :program-id="programId" /> -->
    </template>
  </page-dashboard>
</template>
