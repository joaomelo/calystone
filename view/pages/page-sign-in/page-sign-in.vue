<script setup>
import { ButtonBase, FormBase, InputPassword, InputText, useI18n } from "@lib";
import { FrameSign } from "@view/smart";

import { useSignIn } from "./page-sign-in-use";

const { t } = useI18n();
const { payload, signIn } = useSignIn();
</script>
<template>
  <frame-sign
    :heading="t('shared.sign-in')"
    :question="t('shared.no-account')"
    link-to="/sign-up"
    :link-text="t('shared.sign-up')"
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
            data-test="sign-in"
            :label="t('shared.sign-in')"
            :busy="signIn.busy"
            type="submit"
          />
        </template>
      </form-base>
    </template>
  </frame-sign>
</template>
