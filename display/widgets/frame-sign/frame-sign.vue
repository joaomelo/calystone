<script setup>
import { TextHeading } from "@lib";

import { FrameFocus } from "../frame-focus";

defineProps({
  heading: {
    required: true,
    type: String,
  },
  linkText: {
    required: true,
    type: String,
  },
  linkTo: {
    required: true,
    type: String,
  },
  question: {
    required: true,
    type: String,
  },
});
</script>
<template>
  <frame-focus>
    <div class="frame-auth">
      <text-heading class="frame-auth-title">
        calystone
      </text-heading>
      <text-heading class="frame-auth-heading">
        {{ heading }}
      </text-heading>
      <div><slot name="form" /></div>
      <div class="frame-auth-link">
        <span>{{ question }}</span>
        <span>&nbsp;</span>
        <router-link
          id="link-sign"
          :to="linkTo"
        >
          {{ linkText }}
        </router-link>
      </div>
    </div>
  </frame-focus>
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
  color: var(--color-content-40);
  font-size: var(--font-size-30);
}

.frame-auth-heading {
  font-size: var(--font-size-25);
}
</style>
