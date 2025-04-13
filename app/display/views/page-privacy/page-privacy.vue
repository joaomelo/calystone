<script setup>
import { FrameText } from "@/display/widgets";
import { TextMarkdown } from "@/utils";

import pagePrivacy from "./page-privacy.md?raw";
</script>
<template>
  <FrameText
    title="Privacy Policy for Calystone"
    date="2025-01-18"
  >
    <TextMarkdown :markdown="pagePrivacy" />
  </FrameText>
</template>
