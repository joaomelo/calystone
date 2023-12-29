<script setup>
import { TextHeading } from "@lib";
import { FrameBase } from "../frame-base";

defineProps({
  heading: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  linkTo: {
    type: String,
    required: true,
  },
  linkText: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <frame-base>
    <div class="frame-auth">
      <text-heading class="frame-auth-title">calystone</text-heading>
      <text-heading class="frame-auth-heading">{{ heading }}</text-heading>
      <div><slot name="form"></slot></div>
      <div class="frame-auth-link">
        <span>{{ question }}</span>
        <span>&nbsp;</span>
        <router-link id="link-sign" :to="linkTo">
          {{ linkText }}
        </router-link>
      </div>
    </div>
  </frame-base>
</template>
<style scoped>
.frame-auth {
  display: flex;
  flex-direction: column;
  gap: var(--size-40);

  width: min(100%, var(--size-70));
  margin: auto;
}

.frame-auth-title,
.frame-auth-heading,
.frame-auth-link {
  text-align: center;
}

.frame-auth-title {
  color: var(--color-neutral-40);
  font-size: var(--font-size-30);
}

.frame-auth-heading {
  font-size: var(--font-size-25);
}
</style>
