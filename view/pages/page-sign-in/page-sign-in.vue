<script setup>
import { ButtonBase, FormBase, InputPassword, InputText, useI18n } from "@lib";
import { FrameSign } from "@view/smart";

import { useSignIn } from "./use-sign-in";

const { t } = useI18n();
const { payload, signIn } = useSignIn();
</script>
<template>
  <frame-sign
    :heading="t('auth.sign-in')"
    :question="t('page-sign-in.no-account')"
    link-to="/sign-up"
    :link-text="t('auth.sign-up')"
  >
    <template #form>
      <form-base
        :error="signIn.error"
        @submit="signIn.run"
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
            data-test="sign-in"
            :label="t('auth.sign-in')"
            :busy="signIn.busy"
            type="submit"
          />
        </template>
      </form-base>
    </template>
  </frame-sign>
</template>
