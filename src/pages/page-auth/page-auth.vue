<script setup>
import { inject } from "vue";
import { ButtonBase } from "../../lib";
import { PageExternal } from "../page-base";

const { auth } = inject("store");

const handleSign = () => auth.signIn();
</script>
<template>
  <page-external title="auth">
    <button-base @click="handleSign">sign in</button-base>
    <button-base @click="handleSign">sign up</button-base>
  </page-external>
</template>
