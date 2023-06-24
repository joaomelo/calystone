<script setup>
import { inject } from "vue";
import { ButtonBase } from "../../../components";
import { PageExternal } from "../page-base";

const { auth } = inject("globals");

const handleSign = () => auth.signIn();
</script>
<template>
  <page-external title="auth">
    <button-base @click="handleSign">sign in</button-base>
    <button-base @click="handleSign">sign up</button-base>
  </page-external>
</template>
