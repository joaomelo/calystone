<script setup lang="ts">
import type { Pilot } from "@pilot";

import "@view/styles";

defineProps<Props>();
type Props = {
  pilot: Pilot;
};
</script>

<template>
  <component
    :is="pilot.display.page"
    v-bind="pilot.display.props"
    @dispatch="pilot.dispatch"
  />
</template>
