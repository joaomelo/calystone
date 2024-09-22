<script setup>
import { ButtonBase, FormBase, InputPassword, InputText, useI18n } from "@lib";
import { FrameSign } from "@view/smart";

import { useSignUp } from "./page-sign-up-use";

const { t } = useI18n();
const { payload, signUp } = useSignUp();
</script>
<template>
  <frame-sign
    :heading="t('shared.sign-up')"
    :question="t('shared.have-account')"
    link-to="/sign-in"
    :link-text="t('shared.sign-in')"
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
            :label="t('shared.email')"
            autofocus
          />
          <input-password
            v-model="payload.password"
            data-test="password"
            :label="t('shared.password')"
          />
        </template>
        <template #buttons>
          <button-base
            data-test="sign-up"
            :label="t('shared.sign-up')"
            :busy="signUp.busy"
            type="submit"
          />
        </template>
      </form-base>
    </template>
  </frame-sign>
</template>
