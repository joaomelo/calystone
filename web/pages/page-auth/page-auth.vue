<script setup>
import { ButtonBase, HeadingText, InputBase, useT } from "@lib";
import { useSignUp, useSignIn } from "@body";
import { PageBase } from "../page-base";

const t = useT();
const [signIn, signInPayload] = useSignIn();
const [signUp, signUpPayload] = useSignUp();
</script>
<template>
  <page-base>
    <template #title><heading-text>auth</heading-text></template>
    <template #default>
      <input-base v-model="signInPayload.email" :label="t('email')" />
      <input-base v-model="signInPayload.password" :label="t('password')" />
      <button-base @click="signIn.run">{{ t("signIn") }}</button-base>

      <input-base v-model="signUpPayload.email" :label="t('email')" />
      <input-base v-model="signUpPayload.password" :label="t('password')" />
      <button-base @click="signUp.run">{{ t("signUp") }}</button-base>
    </template>
  </page-base>
</template>
