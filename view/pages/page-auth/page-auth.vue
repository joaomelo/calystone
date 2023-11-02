<script setup lang="ts">
import type { Message } from "@shared";

import { FrameBase } from "@view/frames";
import { useT } from "@view/i18n";
import { ButtonBase } from "@view/components";

withDefaults(defineProps<Props>(), { busy: false });
type Props = {
  busy?: boolean;
};

defineEmits<Emits>();
type Emits = {
  dispatch: [message: Message];
};

const t = useT();
</script>
<template>
  <frame-base>
    <div class="page-auth">
      <button-base :busy="busy" @click="$emit('dispatch', { name: 'sign-in' })">
        {{ t("sign-in") }}
      </button-base>
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
