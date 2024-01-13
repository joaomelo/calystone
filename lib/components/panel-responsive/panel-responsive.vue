<script setup>
import { useIsAtLeastMedium } from "@lib";

defineProps({
  equal: {
    default: false,
    type: Boolean,
  },
  reverse: {
    default: false,
    type: Boolean,
  },
});

// this class will be used by consuming components to target specific styles depending on the size state. is best not to use the actual screen size from the composable as the class name since this can be prop based later
const atLeast = useIsAtLeastMedium();
</script>
<template>
  <div
    class="panel-responsive"
    :class="{ 'at-least': atLeast, 'not-at-least': !atLeast, equal, reverse }"
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
  justify-content: start;
}

.panel-responsive.at-least.reverse {
  flex-direction: row-reverse;
  justify-content: end;
}

.panel-responsive.at-least.equal > :deep(*) {
  /* make children elements fill equal size columns. https://css-tricks.com/equal-columns-with-flexbox-its-more-complicated-than-you-might-think/ */
  flex-basis: 100%;
}
</style>
