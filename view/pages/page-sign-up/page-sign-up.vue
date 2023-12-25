<script setup>
import { ButtonBase, FormBase, InputPassword, InputText, useI18n } from "@lib";
import { FrameSign } from "@view";
import { useSignUp } from "./use-sign-up";

const { t } = useI18n();
const { task, payload } = useSignUp();
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
            :label="t('frame-sign.sign-up')"
            :busy="task.busy"
            type="submit"
          />
        </template>
      </form-base>
    </template>
    <template #link>
      <span>{{ t("page-sign-up.have-account") }}</span>
      <span>&nbsp;</span>
      <router-link to="/page-sing-in">
        {{ t("frame-sign.sign-in") }}
      </router-link>
    </template>
  </frame-sign>
</template>
