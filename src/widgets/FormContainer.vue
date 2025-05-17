<script setup lang="ts">
import { reactive } from 'vue';
import CardInformation from '../features/CardInformation.vue';
import UserInformation from '../features/UserInformation.vue';
import type { FormErrorKeys, FormState } from '../shared/types/form.ts';
import type { BirthDate } from '../shared/types/userInfo.ts';
import SubmitButton from '../shared/ui/SubmitButton.vue';

const initialFormState: FormState = {
  fullName: '',
  email: '',
  zip: '',
  birthDate: {
    month: '',
    day: '',
    year: ''
  },
  gender: 'female',
  cardHolder: '',
  cardNumber: '',
  expirationDate: '',
  cvv: ''
};
const initialFormErrors: Record<FormErrorKeys, string> = {
  fullName: '',
  email: '',
  zip: '',
  birthDate: '',
  cardHolder: '',
  cardNumber: '',
  expirationDate: '',
  cvv: ''
};

const formState = reactive<FormState>({ ...initialFormState });
const formErrors = reactive<Record<FormErrorKeys, string>>(initialFormErrors);

const handleChange = <K extends keyof FormState>(key: K, value: FormState[K]) => {
  if (key === 'birthDate') {
    formState.birthDate = value as BirthDate;
  } else {
    formState[key] = value;
  }
};

const handleSubmit = () => {
  // Handle form submission logic here
  console.log('Form submitted:', formState);
  // form reset
  Object.assign(formState, structuredClone(initialFormState));
};
</script>

<template>
  <main
    class="bg-form-background flex flex-col items-center max-mobile:py-[22px] max-mobile:px-[20px] py-[34px] px-[24px] gap-[34px] rounded-[4.59px] border border-form-border"
  >
    <div class="max-mobile:w-[250px] w-[328px]">
      <h1 class="text-form-title font-bold text-xl text-center mb-[34px] max-mobile:mb-[14px]">
        Get your Car Insurance for $9.99
      </h1>

      <UserInformation
        :form-info-state="formState"
        :form-errors="formErrors"
        :on-change="handleChange"
      />

      <CardInformation
        :form-card-state="formState"
        :form-errors="formErrors"
        :on-change="handleChange"
      />

      <div class="max-mobile:mt-[14px] mt-[34px]">
        <SubmitButton @click="handleSubmit">continue</SubmitButton>
      </div>
    </div>
  </main>
</template>
