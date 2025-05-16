<script setup lang="ts">
import { reactive } from 'vue';
import pin from '../shared/assets/pin.svg';
import Dropdown from '../shared/ui/Dropdown.vue';
import FieldWrapper from '../shared/ui/FieldWrapper.vue';
import Input from '../shared/ui/Input.vue';
import RadioButton from '../shared/ui/RadioButton.vue';

type UserInfoFieldKeys = 'fullName' | 'email' | 'zip';
type UserBirthDateFieldKeys = 'month' | 'day' | 'year';

interface Field<T> {
  key: T;
  title: string;
}

const getYearOptions = () => {
  const start = 1900;
  const end = new Date().getFullYear();
  const years: string[] = [];

  for (let year = start; year <= end; year++) {
    years.push(String(year));
  }

  return years;
};

const getMonthOptions = () =>
  Array.from({ length: 12 }, (_, i) =>
    new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(2000, i))
  );

// change to display days by month
const getDayOptions = () => Array.from({ length: 31 }, (_, i) => String(i + 1));

const userInfoInputs: Field<UserInfoFieldKeys>[] = [
  { key: 'fullName', title: 'Full Name' },
  { key: 'email', title: 'Email' },
  { key: 'zip', title: 'Zip Code' }
];
const birthDateFields: Field<UserBirthDateFieldKeys>[] = [
  { key: 'month', title: 'Month' },
  { key: 'day', title: 'Day' },
  { key: 'year', title: 'Year' }
];

const formState = reactive<Record<UserInfoFieldKeys, string>>({
  fullName: '',
  email: '',
  zip: ''
});

const birthDateState = reactive<Record<UserBirthDateFieldKeys, string>>({
  month: '',
  day: '',
  year: ''
});

const formErrors = reactive<Record<UserInfoFieldKeys | 'birthDate', string>>({
  fullName: '',
  email: '',
  zip: '',
  birthDate: ''
});

const birthDateOptions: Record<UserBirthDateFieldKeys, string[]> = {
  month: getMonthOptions(),
  day: getDayOptions(),
  year: getYearOptions()
};

function handleChange(key: UserInfoFieldKeys, value: string) {
  formState[key] = value;
}
</script>

<!-- change width for mobile -->
<template>
  <div class="bg-form-background flex flex-col items-center py-[34px] px-[24px] gap-[34px]">
    <h1 class="text-form-title font-bold text-xl text-center">Get your Car Insurance for $9.99</h1>
    <div class="w-[328px]">
      <div v-for="field in userInfoInputs" :key="field.key">
        <FieldWrapper :title="field.title">
          <Input
            :value="formState[field.key]"
            :error-message="formErrors[field.key]"
            :onChange="(val) => handleChange(field.key, val)"
          >
            <template v-if="field.key === 'zip'" #prefix>
              <img :src="pin" alt="pin" class="size-[18px] mr-1" />
            </template>
          </Input>
        </FieldWrapper>
      </div>

      <FieldWrapper title="Birth date">
        <div class="flex gap-1">
          <div
            v-for="{ key, title } in birthDateFields"
            :key="key"
            :class="key === 'month' ? 'flex-2' : 'flex-1'"
          >
            <Dropdown
              :value="birthDateState[key]"
              :options="birthDateOptions[key]"
              :placeholder="title"
            />
          </div>
        </div>
        <div class="h-[20px]">
          <p v-if="formErrors.birthDate" class="text-red-500 text-sm">
            {{ formErrors.birthDate }}
          </p>
        </div>
      </FieldWrapper>

      <FieldWrapper title="Gender">
        <div class="flex gap-3">
          <RadioButton label="Female" value="female" :selected="true" />
          <RadioButton label="Male" value="male" :selected="false" />
        </div>
      </FieldWrapper>
    </div>
  </div>
</template>
