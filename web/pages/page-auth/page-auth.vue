<script setup>
import { reactive } from "vue";
import { ButtonBase, HeadingText, InputBase, useService, useT } from "@lib";
import { PageBase } from "../page-base";

const t = useT();

const credentials = reactive({ email: null, password: null });
const auth = useService("auth");
const handleSignIn = () => auth.signIn(credentials);
const handleSignUp = () => auth.signUp(credentials);
</script>
<template>
  <page-base>
    <template #title><heading-text>auth</heading-text></template>
    <template #default>
      <input-base v-model="credentials.email" :label="t('email')" />
      <input-base v-model="credentials.password" :label="t('password')" />
      <button-base @click="handleSignIn">{{ t("signIn") }}</button-base>
      <button-base @click="handleSignUp">{{ t("signUp") }}</button-base>
    </template>
  </page-base>
</template>
