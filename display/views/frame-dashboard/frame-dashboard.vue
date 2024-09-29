<script setup lang="ts">
// import { useIsAtLeastLarge, useSideBarState } from "@lib";

// import FrameTop from "./frame-top.vue";
// import DashboardNavigation from "./dashboard-navigation.vue";

defineProps({
  title: {
    default: null,
    type: String,
  },
});
</script>
<template>
  <div class="frame-dashboard">
    <nav class="frame-dashboard-top">
      outline
    </nav>
    <aside class="frame-dashboard-side">
      a
    </aside>
    <main class="frame-dashboard-main">
      <router-view />
    </main>
    <!-- <DashboardNavigation /> -->
    <!-- <frame-side v-model="sideBarState" />
        <div class="frame-dashboard-content">
          <frame-top
            v-model="sideBarState"
            :title="title"
          /> -->
    
    <!-- </div> -->
  </div>
</template>

<style scoped>
.frame-dashboard {
  height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: auto 1fr;
  grid-template-areas:
    "top top"
    "side main";
  overflow: hidden;
}

.frame-dashboard .frame-dashboard-top {
  grid-area: top;
}

.frame-dashboard .frame-dashboard-side {
  grid-area: side;
}

.frame-dashboard .frame-dashboard-main {
  grid-area: main;
}
</style>
