<script setup>
import { usePilot } from "@pilot";
import { reactive } from "vue";
import { FrameBase } from "@view/frames";
import {
  ButtonBase,
  ButtonsPanel,
  HeadingText,
  InputBase,
  useI18n,
  useTask,
} from "@lib";

const { t } = useI18n();
const pilot = usePilot();
const payload = reactive({ email: null, password: null });
const singIn = useTask(() => pilot.singIn(payload));
</script>
<template>
  <frame-base>
    <div class="page-auth">
      <heading-text>calystone</heading-text>
      <input-base v-model="payload.email" :label="t('email')" />
      <input-base
        v-model="payload.password"
        type="password"
        :label="t('password')"
      />
      <buttons-panel>
        <button-base
          :busy="singIn.busy"
          :label="t('sign-in')"
          @click="singIn.run"
        />
      </buttons-panel>
    </div>
  </frame-base>
</template>
<style scoped>
.page-auth {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: var(--size-20);
}
</style>
