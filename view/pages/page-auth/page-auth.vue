<script setup>
import { reactive } from "vue";
import {
  ButtonBase,
  ButtonsPanel,
  FormBase,
  InputBase,
  TextHeading,
  useI18n,
  useTask,
} from "@lib";
import { useBody } from "@body";
import { useDisplay } from "@view/display";
import { FrameBase } from "@view/frames";

const display = useDisplay();
const { t } = useI18n();
const { gate } = useBody();

const payload = reactive({ email: null, password: null });

const signIn = useTask(async () => {
  await gate.signIn(payload);
  display.pageStart();
});
</script>
<template>
  <frame-base>
    <text-heading class="page-auth-heading">calystone</text-heading>
    <form-base :error="signIn.error">
      <input-base
        id="input-email"
        v-model="payload.email"
        :label="t('page-auth.email')"
      />
      <input-base
        id="input-password"
        v-model="payload.password"
        type="password"
        :label="t('page-auth.password')"
      />
      <buttons-panel>
        <button-base
          id="button-sign-in"
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
