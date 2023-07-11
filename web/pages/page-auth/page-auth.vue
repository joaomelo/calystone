<script setup>
import { reactive } from "vue";
import {
  ButtonBase,
  InputBase,
  useGlobals,
  useGlobalStateful,
} from "../../../lib";
import { PageBase } from "../page-base";

const signInText = useGlobalStateful((i18n) => i18n.t("signIn"));
const signUpText = useGlobalStateful((i18n) => i18n.t("signUp"));
const emailText = useGlobalStateful((i18n) => i18n.t("email"));
const passwordText = useGlobalStateful((i18n) => i18n.t("password"));

const credentials = reactive({ email: null, password: null });
const { auth } = useGlobals();
const handleSignIn = () => auth.signIn(credentials);
const handleSignUp = () => auth.signUp(credentials);
</script>
<template>
  <page-base title="auth">
    <input-base v-model="credentials.email" :label="emailText" />
    <input-base v-model="credentials.password" :label="passwordText" />
    <button-base @click="handleSignIn">{{ signInText }}</button-base>
    <button-base @click="handleSignUp">{{ signUpText }}</button-base>
  </page-base>
</template>
