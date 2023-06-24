<script setup>
import { inject, watch } from "vue";
import { useRouter } from "vue-router";
import { AUTH_STATUSES } from "../../../../body";
import { PageBase } from "../page-base";
import { routesPaths } from "../router";

const router = useRouter();
const { auth } = inject("globals");
const authStatus = auth.map((a) => a.status);

watch(
  () => authStatus.value,
  (status) => {
    switch (status) {
      case AUTH_STATUSES.SIGNED_IN:
        return router.push(routesPaths.projects);
      case AUTH_STATUSES.SIGNED_OUT:
        return router.push(routesPaths.auth);
    }
  },
  {
    immediate: true,
  }
);
</script>
<template>
  <page-base><p class="message">carregando...</p></page-base>
</template>
<style scoped>
.message {
  text-align: center;
}
</style>
