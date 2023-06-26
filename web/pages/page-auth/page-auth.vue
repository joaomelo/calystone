<script setup>
import { inject, reactive } from "vue";
import { useStateful, ButtonBase, InputBase } from "../../../lib";
import { PageExternal } from "../page-base";

const { auth, i18n } = inject("globals");

const signInText = useStateful(i18n, (i) => i.t("signIn"));
const signUpText = useStateful(i18n, (i) => i.t("signUp"));
const emailText = useStateful(i18n, (i) => i.t("email"));
const passwordText = useStateful(i18n, (i) => i.t("password"));

const credentials = reactive({ email: null, password: null });
const handleSignIn = () => auth.signIn(credentials);
const handleSignUp = () => auth.signUp(credentials);
</script>
<template>
  <page-external title="auth">
    <input-base v-model="credentials.email" :label="emailText" />
    <input-base v-model="credentials.password" :label="passwordText" />
    <button-base @click="handleSignIn">{{ signInText }}</button-base>
    <button-base @click="handleSignUp">{{ signUpText }}</button-base>
  </page-external>
</template>
