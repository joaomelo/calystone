<script setup>
import {
  ButtonBase,
  FormBase,
  InputPassword,
  InputText,
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
    <div class="page-auth">
      <text-heading class="page-auth-heading" size="var(--font-size-25)">
        calystone
      </text-heading>
      <form-base :error="task.error" enter @submit="task.run">
        <template #default>
          <input-text
            id="input-email"
            v-model="payload.email"
            :label="t('page-auth.email')"
            autofocus
          />
          <input-password
            id="input-password"
            v-model="payload.password"
            :label="t('page-auth.password')"
          />
        </template>
        <template #buttons>
          <button-base
            id="button-sign-in"
            :label="t('page-auth.sign-in')"
            :busy="task.busy"
            type="submit"
          />
        </template>
      </form-base>
    </div>
  </frame-base>
</template>
<style scoped>
.page-auth {
  display: flex;
  flex-direction: column;
  gap: var(--size-40);

  width: min(100%, var(--size-70));
  margin: auto;
}

.page-auth-heading {
  text-align: center;
}
</style>
