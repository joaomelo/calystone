<script setup lang="ts">
import FrameDashboardSide from "./frame-dashboard-side.vue";
</script>
<template>
  <div class="frame-dashboard">
    <FrameDashboardSide />
    <main>
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.frame-dashboard {
  height: 100vh;
  display: grid;
  grid-template-columns: auto 1fr;
  overflow: hidden;
}
</style>
