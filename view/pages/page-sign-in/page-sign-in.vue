<script setup>
// import { ButtonBase, FormBase, InputPassword, InputText, useI18n } from "@lib";
// import { FrameSign } from "@view";

// import { useSignIn } from "./use-sign-in";

// const { t } = useI18n();
// const { payload, task } = useSignIn();
</script>
<template>
  <div>sing in</div>
  <!-- <frame-sign
    :heading="t('frame-sign.sign-in')"
    :question="t('page-sign-in.no-account')"
    link-to="/page-sign-up"
    :link-text="t('frame-sign.sign-up')"
  >
    <template #form>
      <form-base
        :error="task.error"
        @submit="task.run"
      >
        <template #default>
          <input-text
            id="input-email"
            v-model="payload.email"
            :label="t('frame-sign.email')"
            autofocus
          />
          <input-password
            id="input-password"
            v-model="payload.password"
            :label="t('frame-sign.password')"
          />
        </template>
        <template #buttons>
          <button-base
            id="button-sign-in"
            :label="t('frame-sign.sign-in')"
            :busy="task.busy"
            type="submit"
          />
        </template>
      </form-base>
    </template>
  </frame-sign> -->
</template>
