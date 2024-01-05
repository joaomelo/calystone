<script setup>
import { ButtonBase, FormBase, InputPassword, InputText, useI18n } from "@lib";
import { FrameSign } from "@view";
import { useSignUp } from "./use-sign-up";

const { t } = useI18n();
const { task, payload } = useSignUp();
</script>
<template>
  <frame-sign
    :heading="t('frame-sign.sign-up')"
    :question="t('page-sign-up.have-account')"
    link-to="/page-sign-in"
    :link-text="t('frame-sign.sign-in')"
  >
    <template #form>
      <form-base
        :error="task.error"
        @submit="task.run"
      >
        <template #default>
          <input-text
            id="input-email"
            v-model="payload.email"
            :label="t('frame-sign.email')"
            autofocus
          />
          <input-password
            id="input-password"
            v-model="payload.password"
            :label="t('frame-sign.password')"
          />
        </template>
        <template #buttons>
          <button-base
            id="button-sign-up"
            :label="t('frame-sign.sign-up')"
            :busy="task.busy"
            type="submit"
          />
        </template>
      </form-base>
    </template>
  </frame-sign>
</template>
