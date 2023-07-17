<script setup>
import { reactive } from "vue";
import {
  ButtonBase,
  InputBase,
  HeadingText,
  useGlobals,
  useGlobalStateful,
} from "../../../lib";
import { PageBase } from "../page-base";

const signInText = useGlobalStateful((i18n) => i18n.t("signIn"));
const signUpText = useGlobalStateful((i18n) => i18n.t("signUp"));
const emailText = useGlobalStateful((i18n) => i18n.t("email"));
const passwordText = useGlobalStateful((i18n) => i18n.t("password"));

const credentials = reactive({ email: null, password: null });
const { gatekeeper } = useGlobals();
const handleSignIn = () => gatekeeper.signIn(credentials);
const handleSignUp = () => gatekeeper.signUp(credentials);
</script>
<template>
  <page-base>
    <template #title><heading-text>auth</heading-text></template>
    <template #default>
      <input-base v-model="credentials.email" :label="emailText" />
      <input-base v-model="credentials.password" :label="passwordText" />
      <button-base @click="handleSignIn">{{ signInText }}</button-base>
      <button-base @click="handleSignUp">{{ signUpText }}</button-base>
    </template>
  </page-base>
</template>
