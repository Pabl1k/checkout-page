<script setup lang="ts">
import CardInformation from '../../features/CardInformation.vue';
import UserInformation from '../../features/UserInformation.vue';
import SubmitButton from '../../shared/ui/SubmitButton.vue';
import { useForm } from './hooks/useForm.ts';

const { formState, formErrors, trimValues, handleChange, holderNameAutoFill, handleSubmit } =
  useForm();
</script>

<template>
  <main
    class="bg-form-background flex flex-col items-center max-mobile:py-[22px] max-mobile:px-[20px] py-[34px] px-[24px] gap-[34px] rounded-[4.59px] border border-form-border"
  >
    <form class="max-mobile:w-[250px] w-[328px]" @submit.prevent="handleSubmit">
      <h1
        class="text-form-title font-bold text-xl leading-none text-center mb-[34px] max-mobile:mb-[14px]"
      >
        Get your Car Insurance for $9.99
      </h1>

      <UserInformation
        :form-info-state="formState"
        :form-errors="formErrors"
        :on-full-name-blur="holderNameAutoFill"
        :on-input-blur="trimValues"
        :on-change="handleChange"
      />

      <CardInformation
        :form-card-state="formState"
        :form-errors="formErrors"
        :on-input-blur="trimValues"
        :on-change="handleChange"
      />

      <div class="max-mobile:mt-[14px] mt-[34px]">
        <SubmitButton type="submit">continue</SubmitButton>
      </div>
    </form>
  </main>
</template>
