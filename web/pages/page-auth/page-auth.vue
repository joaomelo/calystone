<script setup>
import { inject, reactive } from "vue";
import { ButtonBase, InputBase } from "../../components";
import { PageExternal } from "../page-base";

const { auth } = inject("globals");

const credentials = reactive({ email: null, password: null });
const handleSignIn = () => auth.signIn(credentials);
const handleSignUp = () => auth.signUp(credentials);
</script>
<template>
  <page-external title="auth">
    <input-base v-model="credentials.email" />
    <input-base v-model="credentials.password" />
    <button-base @click="handleSignIn">sign in</button-base>
    <button-base @click="handleSignUp">sign up</button-base>
  </page-external>
</template>
