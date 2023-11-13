<script setup>
// import { usePilot } from "@pilot";
import { FrameBase } from "@view/frames";
// import { useT } from "@view/i18n";
// import { ButtonBase, useTask } from "@view/components";

// const pilot = usePilot();
// const t = useT();

// const singIn = useTask(() => pilot.singIn());
</script>
<template>
  <frame-base>
    <div class="page-auth">
      auth
      <!-- <button-base :busy="singIn.busy" @click="singIn.run">
        {{ t("sign-in") }}
      </button-base> -->
    </div>
  </frame-base>
</template>
<style scoped>
.page-auth {
  flex-grow: 1;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: var(--font-size-40);
}
</style>
