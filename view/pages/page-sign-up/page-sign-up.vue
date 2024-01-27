<script setup>
import { ButtonBase, FormBase, InputPassword, InputText, useI18n } from "@lib";
import { FrameSign } from "@view/smart";

import { useSignUp } from "./use-sign-up";

const { t } = useI18n();
const { payload, signUp } = useSignUp();
</script>
<template>
  <frame-sign
    :heading="t('auth.sign-up')"
    :question="t('page-sign-up.have-account')"
    link-to="/sign-in"
    :link-text="t('auth.sign-in')"
  >
    <template #form>
      <form-base
        :error="signUp.error"
        @submit="signUp.run"
      >
        <template #default>
          <input-text
            v-model="payload.email"
            data-test="email"
            :label="t('auth.email')"
            autofocus
          />
          <input-password
            v-model="payload.password"
            data-test="password"
            :label="t('auth.password')"
          />
        </template>
        <template #buttons>
          <button-base
            data-test="sign-up"
            :label="t('auth.sign-up')"
            :busy="signUp.busy"
            type="submit"
          />
        </template>
      </form-base>
    </template>
  </frame-sign>
</template>
