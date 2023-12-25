<script setup>
import { TextHeading } from "@lib";
import { FrameBase } from "../frame-base";
</script>
<template>
  <frame-base>
    <div class="frame-auth">
      <text-heading class="frame-auth-heading" size="var(--font-size-25)">
        calystone
      </text-heading>
      <div><slot name="form"></slot></div>
      <div class="frame-auth-link">
        <slot name="link"></slot>
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

.frame-auth-heading,
.frame-auth-link {
  text-align: center;
}
</style>
