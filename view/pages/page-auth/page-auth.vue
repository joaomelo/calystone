<script setup>
import { usePilot } from "@pilot";
import { reactive } from "vue";
import { FrameBase } from "@view/frames";
import {
  ButtonBase,
  ButtonsPanel,
  TextHeading,
  InputBase,
  useI18n,
  useTask,
  FormBase,
} from "@lib";

const { t } = useI18n();
const pilot = usePilot();
const payload = reactive({ email: null, password: null });
const signIn = useTask(() => pilot.signIn(payload));
</script>
<template>
  <frame-base>
    <text-heading class="page-auth-heading">calystone</text-heading>
    <form-base :error="signIn.error">
      <input-base v-model="payload.email" :label="t('page-auth.email')" />
      <input-base
        v-model="payload.password"
        type="password"
        :label="t('page-auth.password')"
      />
      <buttons-panel>
        <button-base
          :busy="signIn.busy"
          :label="t('page-auth.sign-in')"
          @click="signIn.run"
        />
      </buttons-panel>
    </form-base>
  </frame-base>
</template>
<style scoped>
.page-auth-heading {
  margin-bottom: var(--size-20);
}
</style>
