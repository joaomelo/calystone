<script setup>
import { useIsAtLeastMedium } from "@lib";

// this class will be used by consuming components to target specific styles depending on the size state. is best not to use the actual screen size from the composable as the class name since this can be prop based later
const atLeast = useIsAtLeastMedium();
</script>
<template>
  <div
    class="panel-responsive"
    :class="{ 'at-least': atLeast, 'not-at-least': !atLeast }"
  >
    <slot :at-least="atLeast" />
  </div>
</template>
<style scoped>
.panel-responsive {
  display: flex;
  flex-direction: column;
  gap: var(--size-15);
}

.panel-responsive.at-least {
  flex-direction: row;
}
</style>
