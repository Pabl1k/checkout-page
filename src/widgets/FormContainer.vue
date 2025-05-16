<script setup lang="ts">
import { reactive, watch } from 'vue';
import UserInformation from '../features/UserInformation.vue';
import type { FormErrorKeys, FormState, InputFieldKeys } from '../shared/types/form.ts';
import type { Gender, UserBirthDateFieldKeys } from '../shared/types/userInfo.ts';

const formState = reactive<FormState>({
  fullName: '',
  email: '',
  zip: '',
  birthDate: {
    month: '',
    day: '',
    year: ''
  },
  gender: 'female',
  nameOnCard: '',
  cardNumber: '',
  expirationDate: '',
  cvv: ''
});
watch(formState, (newValue) => {
  console.log('Form state changed:', newValue);
});
const formErrors = reactive<Record<FormErrorKeys, string>>({
  fullName: '',
  email: '',
  zip: '',
  birthDate: '',
  nameOnCard: '',
  cardNumber: '',
  expirationDate: '',
  cvv: ''
});

const handleInputChange = (key: InputFieldKeys, value: string) => {
  formState[key] = value;
};

const handleBirthDateChange = (key: UserBirthDateFieldKeys, value: string) => {
  formState.birthDate[key] = value;
};

const handleGenderChange = (selectedValue: Gender) => {
  formState.gender = selectedValue;
};
</script>

<template>
  <div
    class="bg-form-background flex flex-col items-center max-mobile:py-[22px] max-mobile:px-[20px] py-[34px] px-[24px] gap-[34px] rounded-[4.59px] border border-form-border"
  >
    <div class="max-mobile:w-[250px] w-[328px]">
      <h1 class="text-form-title font-bold text-xl text-center mb-[34px] max-mobile:mb-[14px]">
        Get your Car Insurance for $9.99
      </h1>

      <UserInformation
        :form-info-state="formState"
        :form-errors="formErrors"
        :on-input-change="handleInputChange"
        :on-birth-date-change="handleBirthDateChange"
        :on-gender-change="handleGenderChange"
      />
    </div>
  </div>
</template>
