<script setup>
import { useCase } from "@pilot";
import { FrameBase } from "@view/frames";
import {
  ButtonBase,
  ButtonsPanel,
  TextHeading,
  InputBase,
  useI18n,
  FormBase,
} from "@lib";

const { t } = useI18n();
const { payload, task } = useCase("signInCase");
</script>
<template>
  <frame-base>
    <text-heading class="page-auth-heading">calystone</text-heading>
    <form-base :error="task.error">
      <input-base v-model="payload.email" :label="t('page-auth.email')" />
      <input-base
        v-model="payload.password"
        type="password"
        :label="t('page-auth.password')"
      />
      <buttons-panel>
        <button-base
          :busy="task.busy"
          :label="t('page-auth.sign-in')"
          @click="task.run"
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
