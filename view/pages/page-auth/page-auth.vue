<script setup lang="ts">
import { useT } from "@view/i18n";
import { ButtonBase } from "@view/components";

withDefaults(defineProps<Props>(), { busy: false });
type Props = {
  busy?: boolean;
};

defineEmits<Emits>();
type Emits = {
  "sign-in": [];
};

const t = useT();
</script>
<template>
  <div class="page-auth">
    <button-base :busy="busy" @click="$emit('sign-in')">
      {{ t("sign-in") }}
    </button-base>
  </div>
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
