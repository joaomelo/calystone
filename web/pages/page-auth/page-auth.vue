<script setup>
import {
  ButtonBase,
  HeadingText,
  InputBase,
  useSignIn,
  useSignUp,
  useT,
} from "@lib";
import { PageBase } from "../page-base";

const t = useT();
const { signInTask, payload: signInPayload } = useSignIn();
const { signUpTask, payload: signUpPayload } = useSignUp();
</script>
<template>
  <page-base>
    <template #title><heading-text>auth</heading-text></template>
    <template #default>
      <input-base v-model="signInPayload.email" :label="t('email')" />
      <input-base v-model="signInPayload.password" :label="t('password')" />
      <button-base @click="signInTask.run">{{ t("signIn") }}</button-base>

      <input-base v-model="signUpPayload.email" :label="t('email')" />
      <input-base v-model="signUpPayload.password" :label="t('password')" />
      <button-base @click="signUpTask.run">{{ t("signUp") }}</button-base>
    </template>
  </page-base>
</template>
