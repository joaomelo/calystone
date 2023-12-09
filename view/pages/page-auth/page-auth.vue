<script setup>
import {
  ButtonBase,
  ButtonsPanel,
  FormBase,
  InputBase,
  TextHeading,
  useI18n,
} from "@lib";
import { FrameBase } from "@view";
import { useSignIn } from "./use-sign-in";

const { t } = useI18n();

const { task, payload } = useSignIn();
</script>
<template>
  <frame-base>
    <text-heading class="page-auth-heading">calystone</text-heading>
    <form-base :error="task.error" class="page-auth-form">
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
          :label="t('page-auth.sign-in')"
          :busy="task.busy"
          @click="task.run"
        />
      </buttons-panel>
    </form-base>
  </frame-base>
</template>
<style scoped>
.page-auth-heading {
  margin-bottom: var(--size-40);
  text-align: center;
}

.page-auth-form {
  margin-inline: auto;
}
</style>
