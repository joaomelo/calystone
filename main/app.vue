<script setup lang="ts">
import type { Pilot } from "@pilot";

import { inject } from "vue";
import "@view/styles";

const pilot = inject("pilot") as Pilot;
</script>

<template>
  <router-view v-slot="{ Component }">
    <component
      :is="Component"
      v-bind="pilot.props"
      @dispatch="pilot.dispatch"
    />
  </router-view>
</template>
