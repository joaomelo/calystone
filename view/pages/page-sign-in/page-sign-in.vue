<script setup>
import { ButtonBase, FormBase, InputPassword, InputText, useI18n } from "@lib";
import { FrameSign } from "@view";
import { useSignIn } from "./use-sign-in";

const { t } = useI18n();
const { task, payload } = useSignIn();
</script>
<template>
  <frame-sign>
    <template #form>
      <form-base :error="task.error" @submit="task.run">
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
            id="button-sign-in"
            :label="t('frame-sign.sign-in')"
            :busy="task.busy"
            type="submit"
          />
        </template>
      </form-base>
    </template>
    <template #link>
      <span>{{ t("page-sign-in.no-account") }}</span>
      <span>&nbsp;</span>
      <router-link to="/page-sign-up">
        {{ t("frame-sign.sign-up") }}
      </router-link>
    </template>
  </frame-sign>
</template>
