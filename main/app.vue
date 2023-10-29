<script setup lang="ts">
import { Control } from "@controller";

import {
  FrameBase,
  PageAuth,
  // PageArtifactsPlan,
  // PageArtifactEdit,
} from "@view";

defineProps<Props>();
type Props = {
  control: Control;
};

control.dispatch({
  name: "navigate",
  data: {
    context: getFromBar,
  },
});
</script>

<template>
  <frame-base>
    <template v-if="control.is('AUTHENTICATING')">
      <page-auth @sign-in="control.dispatch({ name: 'sign-in' })" />
    </template>
    <template v-else-if="control.is('ARTIFACTS_PLANNING', 'ARTIFACT_EDITING')">
      <frame-dashboard @interaction="control.dispatch">
        <template v-if="control.is('ARTIFACTS_PLANNING')">
          planning
          <!-- <page-artifacts-plan @interaction="control.dispatch" /> -->
        </template>
        <template v-else-if="control.is('ARTIFACT_EDITING')">
          editing
          <!-- <page-artifact-edit
            :artifact-id="control.context"
            @interaction="control.dispatch"
          /> -->
        </template>
      </frame-dashboard>
    </template>
    <template v-else>loading</template>
  </frame-base>
</template>
