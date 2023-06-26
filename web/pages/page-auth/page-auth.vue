<script setup>
import { inject, reactive } from "vue";
import { useStateful, ButtonBase, InputBase } from "../../../lib";
import { PageExternal } from "../page-base";

const { auth, i18n } = inject("globals");

const signInText = useStateful(i18n, (i) => i.t("signIn"));
const signUpText = useStateful(i18n, (i) => i.t("signUp"));

const credentials = reactive({ email: null, password: null });
const handleSignIn = () => auth.signIn(credentials);
const handleSignUp = () => auth.signUp(credentials);
</script>
<template>
  <page-external title="auth">
    <input-base v-model="credentials.email" />
    <input-base v-model="credentials.password" />
    <button-base @click="handleSignIn">{{ signInText }}</button-base>
    <button-base @click="handleSignUp">{{ signUpText }}</button-base>
  </page-external>
</template>
