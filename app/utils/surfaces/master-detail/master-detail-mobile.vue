<script setup lang="ts">
import Drawer from "primevue/drawer";

const visible = defineModel({ type: Boolean });
</script>
<template>
  <div class="master-detail-mobile">
    <div class="master-detail-mobile-master">
      <slot name="master" />
    </div>
    <Drawer
      v-model:visible="visible"
      class="master-detail-mobile-detail"
      position="full"
    >
      <template #container="{ closeCallback }">
        <div class="master-detail-mobile-detail-content">
          <slot
            :close="closeCallback"
            name="detail"
          />
        </div>
      </template>
    </Drawer>
  </div>
</template>
<style scoped>
.master-detail-mobile {
  height: 100%;
  overflow: hidden;
}

.master-detail-mobile-master {
  height: 100%;
  overflow: hidden;
}

.master-detail-mobile-detail-content {
  height: 100%;
}
</style>